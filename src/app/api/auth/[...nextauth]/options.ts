import { db } from '@/lib/db';
import { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { GetServerSidePropsContext } from 'next';
import {
  AuthOptions,
  getServerSession,
  Session,
  SessionStrategy,
} from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY;

if (!clientId || !clientSecret) {
  console.log('clientId:', clientId);
  console.log('clientSecret:', clientSecret);
  throw new Error('setup auth env');
}

export const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    async signIn({ profile }) {
      const typedProfile = profile as typeof profile & {
        picture: string;
        email_verified: boolean;
        given_name: string;
        family_name: string;
      };

      const authUserId = typedProfile?.sub?.toString() || '0';

      const user = await db.user.findFirst({
        where: { authUserId },
      });

      if (!user && typedProfile) {
        try {
          await db.user.create({
            data: {
              authUserId,
              email: typedProfile.email || '',
              nickname: typedProfile.name || '',
              avatar: typedProfile.picture || '',
              firstName: typedProfile.given_name || '',
              lastName: typedProfile.family_name || '',
            },
          });
        } catch (e) {
          console.log('AuthError: ', e);
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (!token.role) {
        const where = { authUserId: (token.id as string) || '' };

        const userDb: User | null = (await db.user.findFirst({
          where,
        })) as User;

        if (userDb) {
          token.id = userDb.id;
        }
      }
      if (token.id) {
        token.userId = token.id;
      }

      return { ...token, ...user, ...account };
    },
    session({ session, token }: { session: any; token: any }) {
      const typedSession = session as Session & { user: { id: string } };
      const typedToken = token as JWT & { userId: string };

      if (typedToken && typedSession.user) {
        typedSession.user.id = typedToken.userId;
      }

      return typedSession;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */

type ArgType =
  | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
  | [NextApiRequest, NextApiResponse]
  | [];

// @ts-ignore: Ігноруємо попередження про неправильний тип для рест параметра
export function getServerAuthSession(...args: ArgType) {
  return getServerSession(...args, options);
}
