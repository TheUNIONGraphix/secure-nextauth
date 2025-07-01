# 🔐 Secure NextAuth

A secure NextAuth wrapper that prevents session data exposure on the client side while maintaining authentication state management.

[![npm version](https://badge.fury.io/js/@theuniongraphix%2Fsecure-nextauth.svg)](https://www.npmjs.com/package/@theuniongraphix/secure-nextauth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚨 The Problem

NextAuth by default exposes session data to the client side, which can be a **security vulnerability**. Even if you don't use `useSession`, just having the SessionProvider configured will expose session information to the client.

## ✅ The Solution

This library provides a secure wrapper that:

- ✅ **Only exposes authentication status** (boolean) to the client
- ✅ **Keeps sensitive session data** on the server side
- ✅ **Maintains the same developer experience** as NextAuth
- ✅ **Full Next.js App Router support**
- ✅ **Built-in middleware helpers**
- ✅ **TypeScript support**

## 📦 Installation

```bash
npm install @theuniongraphix/secure-nextauth next-auth
```

```bash
yarn add @theuniongraphix/secure-nextauth next-auth
```

```bash
pnpm add @theuniongraphix/secure-nextauth next-auth
```

## 🚀 Quick Start

### Step 1: Configure NextAuth (Standard Setup)

First, set up NextAuth as usual:

```typescript
// app/api/auth/[...nextauth]/options.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Your authentication logic here
        const response = await fetch('https://your-api.com/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        if (response.ok) {
          const user = await response.json();
          return { id: user.id, email: user.email, name: user.name };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: { strategy: 'jwt' },
};
```

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { options } from './options';

const handler = NextAuth(options);
export { handler as GET, handler as POST };
```

### Step 2: Create Auth Status API Route

```typescript
// app/api/auth/status/route.ts
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { options } from '../[...nextauth]/options';

export async function GET() {
  const session = await getServerSession(options);
  const isAuthenticated = !!session?.user;

  return NextResponse.json({ isAuthenticated });
}
```

### Step 3: Setup Provider in Root Layout

```typescript
// app/layout.tsx
import { getServerSession } from 'next-auth';
import { SecureSessionProvider } from '@theuniongraphix/secure-nextauth';
import { options } from './api/auth/[...nextauth]/options';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  const isAuthenticated = !!session?.user;

  return (
    <html lang="en">
      <body>
        <SecureSessionProvider isAuthenticated={isAuthenticated}>
          {children}
        </SecureSessionProvider>
      </body>
    </html>
  );
}
```

### Step 4: Use in Your Components

```typescript
// components/Navbar.tsx
'use client';
import { useSecureSession } from '@theuniongraphix/secure-nextauth';
import { signOut } from 'next-auth/react';

export function Navbar() {
  const { isAuthenticated } = useSecureSession();

  return (
    <nav className="flex justify-between items-center p-4">
      <h1>My App</h1>
      {isAuthenticated ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <a href="/signin">Sign In</a>
      )}
    </nav>
  );
}
```

```typescript
// app/dashboard/page.tsx
import { requireAuthOrRedirect } from '@theuniongraphix/secure-nextauth';
import { options } from '@/app/api/auth/[...nextauth]/options';

export default async function Dashboard() {
  // Automatically redirects if not authenticated
  await requireAuthOrRedirect(options);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected page!</p>
    </div>
  );
}
```

## 🛡️ Middleware Protection

Protect multiple routes with middleware:

```typescript
// middleware.ts
import { createAuthMiddleware } from '@theuniongraphix/secure-nextauth';

export default createAuthMiddleware([
  '/dashboard',
  '/profile',
  '/admin',
  '/settings',
]);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/settings/:path*',
  ],
};
```

## 📚 Complete Example

### Sign In Page

```typescript
// app/signin/page.tsx
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/dashboard');
    } else {
      alert('Login failed');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
```

### Protected Component

```typescript
// components/UserProfile.tsx
'use client';
import { useSecureSession, useAuthStatus } from '@theuniongraphix/secure-nextauth';

export function UserProfile() {
  const { isAuthenticated } = useSecureSession();
  const { isLoading, error, refetch } = useAuthStatus({
    onAuthChange: (isAuth) => {
      console.log('Authentication status changed:', isAuth);
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome!</h2>
          <p>You are successfully authenticated.</p>
          <button onClick={refetch}>Refresh Status</button>
        </div>
      ) : (
        <div>
          <p>Please sign in to continue.</p>
          <a href="/signin">Sign In</a>
        </div>
      )}
    </div>
  );
}
```

## 🔧 API Reference

### Hooks

#### `useSecureSession()`

Returns the authentication state from context.

```typescript
const { isAuthenticated } = useSecureSession();
```

#### `useAuthStatus(config?)`

Client-side hook to fetch authentication status from API.

```typescript
const { isAuthenticated, isLoading, error, refetch } = useAuthStatus({
  authStatusEndpoint: '/api/auth/status', // optional
  onAuthChange: (isAuth) => console.log(isAuth), // optional
});
```

### Components

#### `SecureSessionProvider`

Provides authentication context to child components.

```typescript
<SecureSessionProvider isAuthenticated={isAuthenticated}>
  {children}
</SecureSessionProvider>
```

### Server Utilities

#### `requireAuthOrRedirect(options, redirectTo?)`

Server component helper for automatic redirects.

```typescript
await requireAuthOrRedirect(options, '/custom-login');
```

#### `getAuthStatus(options)`

Get authentication status on the server.

```typescript
const isAuthenticated = await getAuthStatus(options);
```

#### `createAuthMiddleware(protectedPaths, loginPath?)`

Create middleware for route protection.

```typescript
export default createAuthMiddleware(['/dashboard'], '/signin');
```

## 🌟 Why Use This Library?

| Feature               | NextAuth Default | Secure NextAuth  |
| --------------------- | ---------------- | ---------------- |
| Client Session Data   | ❌ Exposed       | ✅ Hidden        |
| Authentication Status | ✅ Available     | ✅ Available     |
| Server Session Access | ✅ Full Access   | ✅ Full Access   |
| Security              | ⚠️ Vulnerable    | ✅ Secure        |
| Developer Experience  | ✅ Good          | ✅ Same + Better |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@theuniongraphix/secure-nextauth)
- [GitHub Repository](https://github.com/TheUNIONGraphix/secure-nextauth)
- [NextAuth.js Documentation](https://next-auth.js.org/)

---

Made with ❤️ by [TheUNIONGraphix](https://github.com/TheUNIONGraphix)
