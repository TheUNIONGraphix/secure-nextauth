# 🔐 nextauth-secure

> **NextAuth v4의 세션 노출 문제를 해결하고, Context API로 로그인 상태만 안전하게 관리하는 Next.js 15+ 지원 라이브러리**

[![npm version](https://badge.fury.io/js/nextauth-secure.svg)](https://badge.fury.io/js/nextauth-secure)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ 주요 특징

- 🔒 **세션 데이터 노출 없이** 로그인 상태만 Context로 관리
- 🚀 Next.js 15, `src` 디렉토리 구조 완벽 지원
- ⚡️ 자동 파일 생성 CLI 제공 (`npx nextauth-secure-setup`)
- 🛡️ NextAuth v4 기반, Credentials Provider 지원
- 📝 TypeScript 타입 정의 자동 생성
- 🎯 간단하고 직관적인 API

---

## 🚀 빠른 시작

### 1. 설치

```bash
npm install nextauth-secure next-auth
```

### 2. 자동 설정

```bash
npx nextauth-secure-setup
```

### 3. 환경 변수 설정

`.env.local`에 추가:

```env
AUTH_SECRET=your-secret-here
```

---

## 📁 자동 생성 파일 구조

```
src/
├── api/
│   └── auth/
│       ├── [...nextauth]/
│       │   └── route.ts          # NextAuth API 엔드포인트
│       └── status/
│           └── route.ts          # 인증 상태 확인 API
├── lib/
│   └── auth.ts                   # NextAuth 설정
├── types/
│   └── auth.d.ts                 # TypeScript 타입 정의
├── context/
│   └── SessionContext.tsx        # Context 및 useSession 훅
└── provider/
    └── SessionContextProvider.tsx # 로그인 상태 관리 Provider
```

---

## 🛠️ 사용법

### 1. **Provider로 앱 감싸기**

```tsx
// src/app/layout.tsx
import { SessionContextProvider } from '@/provider/SessionContextProvider';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="ko">
      <body>
        <SessionContextProvider>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  );
}
```

### 2. **컴포넌트에서 로그인 상태 사용**

```tsx
// src/components/UserStatus.tsx
'use client';
import { useSession } from '@/context/SessionContext';

export function UserStatus() {
  const { isAuthenticated, isLoading, login, logout } = useSession();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2">로딩 중...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <button 
        onClick={login}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        로그인
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-green-600 font-medium">✅ 로그인됨</span>
      <button 
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        로그아웃
      </button>
    </div>
  );
}
```

### 3. **로그인 페이지 생성**

```tsx
// src/app/sign-in/page.tsx
'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignInPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signIn('credentials', {
      userId,
      password,
      redirect: false,
    });

    if (result?.ok) {
      window.location.href = '/';
    } else {
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="사용자 ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---

## 🔧 설정 파일 설명

### NextAuth 설정 (`src/lib/auth.ts`)

```typescript
import { authSignIn } from '@/actions/auth/auth-service';
import type { NextAuthOptions, User } from 'next-auth';
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
        return authSignIn(data.userId, data.password);
      },
    }),
  ],
  // ... 기타 설정
};
```

### TypeScript 타입 정의 (`src/types/auth.d.ts`)

```typescript
import { DefaultSession, DefaultUser } from 'next-auth/next';

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
```

---

## 🎯 API 참조

### `useSession` Hook

```typescript
interface SessionContextType {
  isAuthenticated: boolean;  // 로그인 상태
  isLoading: boolean;        // 로딩 상태
  login: () => Promise<void>;    // 로그인 함수
  logout: () => Promise<void>;   // 로그아웃 함수
}
```

### 인증 상태 API

```typescript
// GET /api/auth/status
// 응답: { isAuthenticated: boolean }
```

---

## 🔄 다른 Provider 사용하기

Google, GitHub 등 다른 Provider를 사용하려면 `src/lib/auth.ts`를 수정하세요:

```typescript
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // ... 기타 설정
};
```

---

## ❓ 자주 묻는 질문

### Q: 세션 데이터가 클라이언트에 노출되나요?
**A:** 아니요! Context에는 오직 `isAuthenticated` 상태만 저장됩니다. 실제 세션 데이터는 서버에서만 관리됩니다.

### Q: Next.js 15와 src 디렉토리 구조를 지원하나요?
**A:** 네! 자동으로 프로젝트 구조를 감지하여 적절한 위치에 파일을 생성합니다.

### Q: TypeScript를 지원하나요?
**A:** 네! 자동으로 타입 정의 파일을 생성하여 완전한 타입 안전성을 제공합니다.

### Q: 다른 인증 Provider를 사용할 수 있나요?
**A:** 네! NextAuth에서 지원하는 모든 Provider를 사용할 수 있습니다.

---

## 🐛 문제 해결

### 빌드 오류가 발생하는 경우
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### 타입 오류가 발생하는 경우
```bash
# TypeScript 캐시 클리어
rm -rf .next
npm run build
```

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## ⭐️ 스타를 눌러주세요!

이 프로젝트가 도움이 되었다면 GitHub에서 스타를 눌러주세요! 🚀
