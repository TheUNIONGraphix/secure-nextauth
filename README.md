# nextauth-secure

> NextAuth v4의 세션 노출 문제를 해결하고, Context API로 로그인 상태만 안전하게 관리하는 Next.js 15+ 지원 라이브러리

---

## ✨ 주요 특징

- **세션 데이터 노출 없이** 로그인 상태만 Context로 관리
- Next.js 15, `src` 디렉토리 구조 완벽 지원
- 자동 파일 생성 CLI 제공 (`npx nextauth-secure-setup`)
- NextAuth v4 기반, Google 등 다양한 Provider 지원

---

## 🚀 설치 및 자동 설정

```bash
npm install nextauth-secure next-auth
npx nextauth-secure-setup
```

- `src` 디렉토리가 있으면 `src/` 하위에, 없으면 루트에 파일 자동 생성
- 생성 파일:
  - `src/app/api/auth/[...nextauth]/route.ts`
  - `src/app/api/auth/status/route.ts`
  - `src/lib/auth.ts`
  - `src/context/SessionContext.tsx`
  - `src/provider/SessionContextProvider.tsx`

---

## ⚡️ 환경 변수 설정

`.env.local`에 아래 항목 추가:

```
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 🛠️ 사용법

### 1. **Provider로 감싸기**

```tsx
// src/app/layout.tsx
import { SessionContextProvider } from '@/provider/SessionContextProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionContextProvider>
          {children}
        </SessionContextProvider>
      </body>
    </html>
  );
}
```

### 2. **로그인 상태 사용**

```tsx
// src/components/UserStatus.tsx
'use client';
import { useSession } from '@/context/SessionContext';

export function UserStatus() {
  const { isAuthenticated, isLoading, login, logout } = useSession();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <button onClick={login}>Login</button>;
  return (
    <div>
      <span>로그인됨</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 📦 자동 생성 파일 설명

- **`src/app/api/auth/[...nextauth]/route.ts`**  
  NextAuth API 엔드포인트

- **`src/app/api/auth/status/route.ts`**  
  로그인 상태만 반환하는 API

- **`src/lib/auth.ts`**  
  NextAuth 옵션(Provider 등) 정의

- **`src/context/SessionContext.tsx`**  
  Context 및 useSession 훅

- **`src/provider/SessionContextProvider.tsx`**  
  로그인 상태 관리 Provider

---

## 📝 커스텀 Provider/옵션

`src/lib/auth.ts`에서 원하는 Provider로 자유롭게 변경하세요.

---

## ❓ FAQ

- **Q. 세션 데이터가 클라이언트에 노출되나요?**  
  A. 아니요, Context에는 오직 로그인 상태만 저장됩니다.

- **Q. Next.js 15, src 디렉토리 구조 지원하나요?**  
  A. 네, 자동 감지 및 지원합니다.

---

## 🧑‍💻 기여

PR/이슈 환영합니다!

---

## License

MIT
