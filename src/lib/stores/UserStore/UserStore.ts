import { IUser } from '@/types';
import { create } from 'zustand/react';

interface IUserSore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useUserStore = create<IUserSore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
