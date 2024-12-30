import { IPage } from '@/types';
import { create } from 'zustand/react';

interface IState {
  isDraftChanged: boolean;
  currentPage: IPage | null;
  draftData: IPage | null;
  setCurrentPage: (currentPage: IPage) => void;
  setDraftData: (draftData: IPage | null) => void;
  setIsDraftChanged: (isDraftChanged: boolean) => void;
  resetDraftData: () => void;
}

export const usePagePanelStore = create<IState>((set, get) => ({
  isDraftChanged: false,
  currentPage: null,
  draftData: null,
  setCurrentPage: (currentPage) => {
    console.log(currentPage);
    set({ currentPage });
  },
  setDraftData: (draftData) => {
    const { currentPage } = get();

    set({ draftData });
    set({
      isDraftChanged: JSON.stringify(currentPage) !== JSON.stringify(draftData),
    });
  },
  setIsDraftChanged: (isDraftChanged) => set({ isDraftChanged }),
  resetDraftData: () => {
    const { currentPage } = get();

    set({ draftData: currentPage, isDraftChanged: false });
  },
}));
