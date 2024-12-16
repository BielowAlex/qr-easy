'use client';
import { api } from '@/lib/providers/TrpcProvider';
import { useUserStore } from '@/lib/stores/UserStore';
import { IUser } from '@/types';
import { useSession } from 'next-auth/react';
import React from 'react';
import style from './style.module.scss';

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  const { mutateAsync: getUserByToken } = api.users.getUserById.useMutation();

  React.useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      getUserByToken().then((data) => {
        console.log(data);

        if (data) {
          setUser(data as IUser);
        }
      });
    } else if (status === 'unauthenticated') {
      logout();
    }
  }, [status, session, setUser, logout, getUserByToken]);

  return (
    <header className={style.container}>
      <h1>TicTacToe online</h1>

      <div>
        <div>
          {/*<Image*/}
          {/*  width={150}*/}
          {/*  height={150}*/}
          {/*  src={session?.user?.image || '/default-avatar.png'}*/}
          {/*  alt="Avatar"*/}
          {/*/>*/}
        </div>
      </div>
    </header>
  );
};

export { Header };
