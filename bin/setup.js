#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateAuthStatusAPI(options = {}) {
  const {
    projectRoot = process.cwd(),
    apiRoute = '/api/auth/status',
    authOptionsPath = '@/lib/auth'
  } = options;

  const apiContent = `import { getAuthStatus, createAuthStatusResponse } from 'nextauth-secure';
import { authOptions } from '${authOptionsPath}';

export async function GET() {
  try {
    const isAuthenticated = await getAuthStatus(authOptions);
    const response = createAuthStatusResponse(isAuthenticated);
    
    return Response.json(response);
  } catch (error) {
    console.error('Auth status API error:', error);
    return Response.json({ isAuthenticated: false }, { status: 500 });
  }
}
`;

  const apiPath = path.join(projectRoot, 'app', apiRoute.replace('/api/', ''), 'route.ts');
  const apiDir = path.dirname(apiPath);

  // 디렉토리 생성
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }

  // API 파일 생성
  fs.writeFileSync(apiPath, apiContent);
  
  return apiPath;
}

function generateAuthStatusComponent(options = {}) {
  const {
    projectRoot = process.cwd(),
    componentName = 'AuthStatus'
  } = options;

  const componentContent = `"use client";
import { useAuthStatus } from 'nextauth-secure';

export function ${componentName}() {
  const { isAuthenticated, isLoading, error } = useAuthStatus();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
    </div>
  );
}
`;

  const componentPath = path.join(projectRoot, 'app', 'components', `${componentName}.tsx`);
  const componentDir = path.dirname(componentPath);

  // 디렉토리 생성
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // 컴포넌트 파일 생성
  fs.writeFileSync(componentPath, componentContent);
  
  return componentPath;
}

function autoSetup(options = {}) {
  const apiPath = generateAuthStatusAPI(options);
  const componentPath = generateAuthStatusComponent(options);
  
  console.log('✅ Auto setup completed!');
  console.log(`📁 API route created: ${apiPath}`);
  console.log(`📁 Component created: ${componentPath}`);
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Import and use the component in your layout or pages');
  console.log('2. Make sure your authOptions are properly configured');
  console.log('3. The API route will be available at /api/auth/status');
  
  return { apiPath, componentPath };
}

// CLI 실행
const args = process.argv.slice(2);
const options = {};

// 명령행 인수 파싱
for (let i = 0; i < args.length; i += 2) {
  const key = args[i];
  const value = args[i + 1];
  
  if (key === '--project-root') {
    options.projectRoot = value;
  } else if (key === '--api-route') {
    options.apiRoute = value;
  } else if (key === '--component-name') {
    options.componentName = value;
  } else if (key === '--auth-options-path') {
    options.authOptionsPath = value;
  }
}

try {
  autoSetup(options);
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
} 