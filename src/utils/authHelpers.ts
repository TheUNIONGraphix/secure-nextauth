"use client";
import { AuthStatusResponse, SecureNextAuthConfig } from '../types';

export async function checkAuthStatus(config?: SecureNextAuthConfig): Promise<AuthStatusResponse> {
  // 서버 사이드에서는 기본값 반환
  if (typeof window === 'undefined') {
    return { isAuthenticated: false };
  }

  const endpoint = config?.authStatusEndpoint || '/api/auth/status';
  
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }
    
    let data: AuthStatusResponse;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error('Invalid JSON response');
    }
    
    return data;
  } catch (error) {
    console.error('Auth status check failed:', error);
    return { isAuthenticated: false };
  }
}

export function createAuthStatusEndpoint(handler: () => Promise<AuthStatusResponse>) {
  return async function authStatusHandler() {
    try {
      const result = await handler();
      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Auth status endpoint error:', error);
      return new Response(JSON.stringify({ isAuthenticated: false }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };
} 