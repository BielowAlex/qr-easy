import { IPage } from '@/types';
import { create } from 'zustand/react';

interface IState {
  currentPage: IPage | null;
  setCurrentPage: (currentPage: IPage) => void;
}

export const usePagePanelStore = create<IState>((set) => ({
  currentPage: null,
  setCurrentPage: (currentPage) => set({ currentPage }),
}));
