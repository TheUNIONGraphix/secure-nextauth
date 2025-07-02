#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function detectProjectStructure(projectRoot) {
  const hasSrc = fs.existsSync(path.join(projectRoot, 'src'));
  const hasAppInSrc = hasSrc && fs.existsSync(path.join(projectRoot, 'src', 'app'));
  const hasAppInRoot = fs.existsSync(path.join(projectRoot, 'app'));
  
  return {
    hasSrc,
    hasAppInSrc,
    hasAppInRoot,
    useSrc: hasSrc && (hasAppInSrc || !hasAppInRoot)
  };
}

function generateAuthStatusAPI(options = {}) {
  const {
    projectRoot = process.cwd(),
    apiRoute = '/api/auth/status',
    authOptionsPath = '@/lib/auth'
  } = options;

  const structure = detectProjectStructure(projectRoot);
  
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

  // src 디렉토리 구조 고려
  const baseDir = structure.useSrc ? 'src' : '';
  const apiPath = path.join(projectRoot, baseDir, 'app', apiRoute.replace('/api/', ''), 'route.ts');
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

  const structure = detectProjectStructure(projectRoot);

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

  // src 디렉토리 구조 고려
  const baseDir = structure.useSrc ? 'src' : '';
  const componentPath = path.join(projectRoot, baseDir, 'components', `${componentName}.tsx`);
  const componentDir = path.dirname(componentPath);

  // 디렉토리 생성
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // 컴포넌트 파일 생성
  fs.writeFileSync(componentPath, componentContent);
  
  return componentPath;
}

function generateNextAuthAPI(options = {}) {
  const {
    projectRoot = process.cwd(),
    authOptionsPath = '@/lib/auth'
  } = options;

  const structure = detectProjectStructure(projectRoot);

  const nextAuthContent = `import NextAuth from 'next-auth';
import { authOptions } from '${authOptionsPath}';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
`;

  // src 디렉토리 구조 고려
  const baseDir = structure.useSrc ? 'src' : '';
  const nextAuthPath = path.join(projectRoot, baseDir, 'app', 'api', 'auth', '[...nextauth]', 'route.ts');
  const nextAuthDir = path.dirname(nextAuthPath);

  // 디렉토리 생성
  if (!fs.existsSync(nextAuthDir)) {
    fs.mkdirSync(nextAuthDir, { recursive: true });
  }

  // NextAuth API 파일 생성
  fs.writeFileSync(nextAuthPath, nextAuthContent);
  
  return nextAuthPath;
}

function autoSetup(options = {}) {
  const structure = detectProjectStructure(options.projectRoot || process.cwd());
  
  const apiPath = generateAuthStatusAPI(options);
  const componentPath = generateAuthStatusComponent(options);
  const nextAuthPath = generateNextAuthAPI(options);
  
  console.log('✅ Auto setup completed!');
  console.log(`📁 Project structure: ${structure.useSrc ? 'src/' : ''}app/`);
  console.log(`📁 API route created: ${apiPath}`);
  console.log(`📁 Component created: ${componentPath}`);
  console.log(`📁 NextAuth API created: ${nextAuthPath}`);
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Install next-auth: npm install next-auth');
  console.log('2. Create authOptions in lib/auth.ts');
  console.log('3. Import and use the component in your layout or pages');
  console.log('4. The API routes will be available at:');
  console.log('   - /api/auth/[...nextauth] (NextAuth)');
  console.log('   - /api/auth/status (Auth status)');
  
  return { apiPath, componentPath, nextAuthPath };
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