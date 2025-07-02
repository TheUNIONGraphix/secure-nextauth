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
      if (url.startsWith('/')) return `${baseUrl}${url}`;
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
