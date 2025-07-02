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

function generateNextAuthAPI(options = {}) {
  const {
    projectRoot = process.cwd(),
    authOptionsPath = '@/lib/auth'
  } = options;

  const structure = detectProjectStructure(projectRoot);
  const baseDir = structure.useSrc ? 'src' : '';

  const nextAuthContent = `import NextAuth from 'next-auth';
import { authOptions } from '${authOptionsPath}';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
`;

  const nextAuthPath = path.join(projectRoot, baseDir, 'app', 'api', 'auth', '[...nextauth]', 'route.ts');
  const nextAuthDir = path.dirname(nextAuthPath);

  if (!fs.existsSync(nextAuthDir)) {
    fs.mkdirSync(nextAuthDir, { recursive: true });
  }

  fs.writeFileSync(nextAuthPath, nextAuthContent);
  return nextAuthPath;
}

function generateAuthOptions(options = {}) {
  const {
    projectRoot = process.cwd(),
    authOptionsPath = '@/lib/auth'
  } = options;

  const structure = detectProjectStructure(projectRoot);
  const baseDir = structure.useSrc ? 'src' : '';

  const authOptionsContent = `import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: {
          label: 'userId',
          type: 'text',
          placeholder: 'userId',
        },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.userId || !credentials?.password) return null;

        const data = {
          userId: credentials.userId,
          password: credentials.password,
        };
        // return authSignIn(data.userId, data.password);
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        // token.name = user.name;
        // token.uuid = user.uuid;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        // name: token.name,
        // uuid: token.uuid,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return \`\${baseUrl}\${url}\`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60 * 30, // 30 days
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
`;

  const libPath = path.join(projectRoot, baseDir, 'lib');
  const authOptionsFilePath = path.join(libPath, 'auth.ts');

  if (!fs.existsSync(libPath)) {
    fs.mkdirSync(libPath, { recursive: true });
  }

  fs.writeFileSync(authOptionsFilePath, authOptionsContent);
  return authOptionsFilePath;
}

function generateAuthStatusAPI(options = {}) {
  const {
    projectRoot = process.cwd(),
    authOptionsPath = '@/lib/auth'
  } = options;

  const structure = detectProjectStructure(projectRoot);
  const baseDir = structure.useSrc ? 'src' : '';

  const authStatusContent = `import { getServerSession } from 'next-auth';
import { authOptions } from '${authOptionsPath}';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAuthenticated = !!session?.user;
    
    return Response.json({ isAuthenticated });
  } catch (error) {
    console.error('Auth status check failed:', error);
    return Response.json({ isAuthenticated: false }, { status: 500 });
  }
}
`;

  const authStatusPath = path.join(projectRoot, baseDir, 'app', 'api', 'auth', 'status', 'route.ts');
  const authStatusDir = path.dirname(authStatusPath);

  if (!fs.existsSync(authStatusDir)) {
    fs.mkdirSync(authStatusDir, { recursive: true });
  }

  fs.writeFileSync(authStatusPath, authStatusContent);
  return authStatusPath;
}

function generateSessionContext(options = {}) {
  const {
    projectRoot = process.cwd()
  } = options;

  const structure = detectProjectStructure(projectRoot);
  const baseDir = structure.useSrc ? 'src' : '';

  const contextContent = `"use client";
import React, { createContext, useContext } from 'react';

interface SessionContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};

export { SessionContext };
`;

  const contextPath = path.join(projectRoot, baseDir, 'context', 'SessionContext.tsx');
  const contextDir = path.dirname(contextPath);

  if (!fs.existsSync(contextDir)) {
    fs.mkdirSync(contextDir, { recursive: true });
  }

  fs.writeFileSync(contextPath, contextContent);
  return contextPath;
}

function generateSessionProvider(options = {}) {
  const {
    projectRoot = process.cwd()
  } = options;

  const structure = detectProjectStructure(projectRoot);
  const baseDir = structure.useSrc ? 'src' : '';

  const providerContent = `"use client";
import React, { useState, useEffect } from 'react';
import { SessionContext } from '../context/SessionContext';

interface SessionContextProviderProps {
  children: React.ReactNode;
}

export function SessionContextProvider({ children }: SessionContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 인증 상태 확인
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status');
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인 함수
  const login = async () => {
    try {
      window.location.href = '/api/auth/signin';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      if (response.ok) {
        setIsAuthenticated(false);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}
`;

  const providerPath = path.join(projectRoot, baseDir, 'provider', 'SessionContextProvider.tsx');
  const providerDir = path.dirname(providerPath);

  if (!fs.existsSync(providerDir)) {
    fs.mkdirSync(providerDir, { recursive: true });
  }

  fs.writeFileSync(providerPath, providerContent);
  return providerPath;
}

function generateType(options = {}) {
  const {
    projectRoot = process.cwd()
  } = options;

  const structure = detectProjectStructure(projectRoot);  
  const baseDir = structure.useSrc ? 'src' : '';

  const typeContent = `import { DefaultSession, DefaultUser } from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      // name: string;
      // uuid: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    accessToken: string;
    // name: string;
    // uuid: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    // name: string;
    // uuid: string;
  }
}
`;

  const typePath = path.join(projectRoot, baseDir, 'types', 'auth.d.ts');
  const typeDir = path.dirname(typePath);

  if (!fs.existsSync(typeDir)) {
    fs.mkdirSync(typeDir, { recursive: true });
  }

  fs.writeFileSync(typePath, typeContent);
  return typePath;
}

function autoSetup(options = {}) {
  const structure = detectProjectStructure(options.projectRoot || process.cwd());
  
  const nextAuthPath = generateNextAuthAPI(options);
  const authOptionsPath = generateAuthOptions(options);
  const authStatusPath = generateAuthStatusAPI(options);
  const contextPath = generateSessionContext(options);
  const providerPath = generateSessionProvider(options);
  const typePath = generateType(options);
  
  console.log('✅ Auto setup completed!');
  console.log(`📁 Project structure: ${structure.useSrc ? 'src/' : ''}app/`);
  console.log(`📁 NextAuth API: ${nextAuthPath}`);
  console.log(`📁 Auth options: ${authOptionsPath}`);
  console.log(`📁 Auth status API: ${authStatusPath}`);
  console.log(`📁 Session context: ${contextPath}`);
  console.log(`📁 Session provider: ${providerPath}`);
  console.log(`📁 TypeScript types: ${typePath}`);
  console.log('');
  console.log('📝 Next steps:');
  console.log('1. Install dependencies: npm install next-auth');
  console.log('2. Set up environment variables in .env.local:');
  console.log('   AUTH_SECRET=your-secret-here');
  console.log('3. Create your auth service: @/actions/auth/auth-service');
  console.log('4. Import SessionContextProvider in your layout');
  console.log('5. Use useSession hook in your components');
  
  return { 
    nextAuthPath, 
    authOptionsPath, 
    authStatusPath, 
    contextPath, 
    providerPath,
    typePath
  };
}

// CLI 실행
if (require.main === module) {
  autoSetup();
} 