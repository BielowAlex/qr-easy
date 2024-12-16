'use client';
import { PageLoader } from '@/components';
import { api } from '@/lib';
import { useUserStore } from '@/lib/stores/UserStore';
import { IUser } from '@/types';
import { useSession } from 'next-auth/react';
import React, { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

const PageLoaderLayout: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();

  const { signIn, signOut, isLoggedIn } = useUserStore();

  const { mutateAsync: getUserByToken } = api.users.getUserById.useMutation();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      getUserByToken().then((data) => {
        if (data) {
          signIn(data as IUser);
        }
      });
    } else if (status === 'unauthenticated') {
      signOut();
    }
  }, [status, session, signOut, getUserByToken, signIn]);

  if (status === 'loading' || !isLoggedIn) {
    return <PageLoader />;
  }

  return children;
};

export { PageLoaderLayout };
