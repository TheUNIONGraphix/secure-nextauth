# 🔐 nextauth-secure

> **A lightweight NextAuth wrapper that solves session exposure issues and safely manages login state with Context API for Next.js 15+**

[![npm version](https://badge.fury.io/js/nextauth-secure.svg)](https://badge.fury.io/js/nextauth-secure)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Key Features

- 🔒 **No session data exposure** - Only login state managed via Context
- 🚀 Full support for Next.js 15, `src` directory structure
- ⚡️ Auto file generation CLI (`npx nextauth-secure-setup`)
- 🛡️ Built on NextAuth v4, supports Credentials Provider
- 📝 TypeScript type definitions auto-generated
- 🎯 Simple and intuitive API

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install nextauth-secure next-auth
```

### 2. Auto Setup

```bash
npx nextauth-secure-setup
```

### 3. Environment Variables

Add to `.env.local`:

```env
AUTH_SECRET=your-secret-here
```

---

## 📁 Auto-Generated File Structure

```
src/
├── app/
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/
│       │   │   └── route.ts      # NextAuth API endpoint
│       │   └── status/
│       │       └── route.ts      # Authentication status API
├── lib/
│   └── auth.ts                   # NextAuth configuration
├── types/
│   └── auth.d.ts                 # TypeScript type definitions
├── context/
│   └── SessionContext.tsx        # Context and useSession hook
└── provider/
    └── SessionContextProvider.tsx # Login state management Provider
```

---

## 🛠️ Usage

### 1. **Wrap your app with Provider**

```tsx
// src/app/layout.tsx
import { SessionContextProvider } from '@/provider/SessionContextProvider';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
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

### 2. **Use login state in components**

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
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <button 
        onClick={login}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-green-600 font-medium">✅ Signed In</span>
      <button 
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
```

### 3. **Create a sign-in page**

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
      alert('Sign in failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
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
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

---

## 🔧 Configuration Files

### NextAuth Configuration (`src/lib/auth.ts`)

```typescript
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
        // return authSignIn(data.userId, data.password);
        return null;
      },
    }),
  ],
  // ... other configurations
};
```

### TypeScript Type Definitions (`src/types/auth.d.ts`)

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

## 🎯 API Reference

### `useSession` Hook

```typescript
interface SessionContextType {
  isAuthenticated: boolean;  // Login status
  isLoading: boolean;        // Loading status
  login: () => Promise<void>;    // Login function
  logout: () => Promise<void>;   // Logout function
}
```

### Authentication Status API

```typescript
// GET /api/auth/status
// Response: { isAuthenticated: boolean }
```

### Auto-Generated API Paths

- **NextAuth API**: `/api/auth/[...nextauth]` → `src/app/api/auth/[...nextauth]/route.ts`
- **Authentication Status API**: `/api/auth/status` → `src/app/api/auth/status/route.ts`

---

## 🔄 Using Other Providers

To use Google, GitHub, or other providers, modify `src/lib/auth.ts`:

```typescript
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // ... other configurations
};
```

---

## ❓ FAQ

### Q: Is session data exposed on the client?
**A:** No! Only the `isAuthenticated` status is stored in Context. Actual session data is managed server-side only.

### Q: Does it support Next.js 15 and src directory structure?
**A:** Yes! It automatically detects your project structure and generates files in the appropriate locations.

### Q: Does it support TypeScript?
**A:** Yes! It automatically generates type definition files for complete type safety.

### Q: Can I use other authentication providers?
**A:** Yes! You can use any provider supported by NextAuth.

---

## 🐛 Troubleshooting

### Build errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Type errors
```bash
# Clear TypeScript cache
rm -rf .next
npm run build
```

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## ⭐️ Star this project!

If this project helped you, please give it a star on GitHub! 🚀
