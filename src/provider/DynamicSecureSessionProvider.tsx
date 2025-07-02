import React from 'react';

interface DynamicSecureSessionProviderProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

// 서버 컴포넌트에서 안전하게 사용할 수 있는 래퍼
export function DynamicSecureSessionProvider({ 
  children, 
  isAuthenticated 
}: DynamicSecureSessionProviderProps): React.ReactNode {
  // 서버 사이드에서는 children만 반환
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  // 클라이언트에서만 동적 import
  const [Provider, setProvider] = React.useState<React.ComponentType<any> | null>(null);

  React.useEffect(() => {
    import('./SecureSessionProvider').then((module) => {
      setProvider(() => module.default || module.SecureSessionProvider);
    }).catch((error) => {
      console.error('Failed to load SecureSessionProvider:', error);
    });
  }, []);

  if (!Provider) {
    // Provider가 로드되지 않았으면 children만 반환
    return <>{children}</>;
  }

  return <Provider isAuthenticated={isAuthenticated}>{children}</Provider>;
} 