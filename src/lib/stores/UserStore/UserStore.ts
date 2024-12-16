import { IUser } from '@/types';
import { create } from 'zustand/react';

interface IUserSore {
  isLoggedIn: boolean;
  user: IUser | null;
  setUser: (user: IUser) => void;
  signOut: () => void;
  signIn: (user: IUser) => void;
}

export const useUserStore = create<IUserSore>((set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user) => set({ user }),
  signIn: (user) => {
    set({ user });
    set({ isLoggedIn: true });
  },
  signOut: () => {
    set({ isLoggedIn: false });
    set({ user: null });
  },
}));
