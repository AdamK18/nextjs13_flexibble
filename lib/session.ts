import { getServerSession } from 'next-auth/next';
import { NextAuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { SessionInterface, UserProfile } from '@/common.types';
import { createUser, getUser } from './actions';

export const authOptions: NextAuthOptions = {
  providers: [GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })],
  /* jwt: {
    encode: ({ secret, token }) => {},
    decode: async ({ secret, token }) => {}
  }, */
  theme: {
    colorScheme: 'light',
    logo: '/logo.svg'
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUser(email)) as { user?: UserProfile };
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user
          }
        };
        return newSession;
      } catch (e) {
        console.log('Error retrieving user', e);
      }
      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const { name, email, image } = user;

        // get the user if they exist
        const userExists = (await getUser(email as string)) as { user?: UserProfile };

        // if they don't exist, create them
        if (!userExists) {
          await createUser(name as string, email as string, image as string);
        }

        return true;
      } catch (e: any) {
        console.log(e);
        return false;
      }
    }
  }
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
