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
