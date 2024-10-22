import { db } from '@/lib/db';
import { User } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_SECRET_KEY;

if (!clientId || !clientSecret) {
  throw new Error('setup auth env');
}

export const options: {
  pages: { signIn: string };
  session: { strategy: string };
  callbacks: {
    jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user: any;
      account: any;
    }): Promise<any>;
    session({
      session: untypedSession,
      token: untypedToken,
    }: {
      session: any;
      token: any;
    }): Session & {
      user: { id: string };
    };
    signIn({
      account,
      profile: untypedProfile,
    }: {
      account: any;
      profile: any;
    }): Promise<boolean>;
  };
  providers: any[];
} = {
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
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account, profile: untypedProfile }) {
      const profile = untypedProfile as typeof untypedProfile & {
        picture: string;
        email_verified: boolean;
      };

      const authUserId = profile?.sub.toString();

      const user = await db.user.findFirst({
        where: {
          authUserId: profile?.sub.toString(),
        },
      });

      if (!user && profile) {
        try {
          await db.user.create({
            data: {
              authUserId,
              email: profile.email || '',
              nickname: profile.name || '',
              avatar: profile.picture || '',
              firstName: profile.given_name || '',
              lastName: profile.family_name || '',
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
        let where:
          | {
              id: string;
            }
          | {
              authUserId: string;
            } = {
          id: (token.id as string) || '',
        };
        where = {
          authUserId: (token.id as string) || '',
        };

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
    session({ session: untypedSession, token: untypedToken }) {
      const session = untypedSession as Session & {
        user: { id: string };
      };

      const token = untypedToken as JWT & { userId: string };
      if (token && session.user) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(...ctx, options);
};
