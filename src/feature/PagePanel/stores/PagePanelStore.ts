import { IPage, PagePanelTabsEnum } from '@/types';
import { create } from 'zustand/react';

interface IState {
  isDraftChanged: boolean;
  currentPage: IPage | null;
  currentPanelTab: PagePanelTabsEnum;
  setPanelTab: (currentPanelTab: PagePanelTabsEnum) => void;
  draftData: IPage | null;
  setCurrentPage: (currentPage: IPage) => void;
  setDraftData: (draftData: IPage | null) => void;
  setIsDraftChanged: (isDraftChanged: boolean) => void;
  resetDraftData: () => void;
  saveDraftChange: () => void;
}

export const usePagePanelStore = create<IState>((set, get) => ({
  currentPanelTab: PagePanelTabsEnum.SEO,
  isDraftChanged: false,
  currentPage: null,
  draftData: null,
  setCurrentPage: (currentPage) => {
    set({ currentPage });
  },
  setPanelTab: (currentPanelTab) => {
    set({ currentPanelTab });
  },
  setDraftData: (draftData) => {
    const { currentPage } = get();

    set({ draftData });
    set({
      isDraftChanged: JSON.stringify(currentPage) !== JSON.stringify(draftData),
    });
  },
  saveDraftChange: () => {
    const { draftData } = get();

    set({ currentPage: draftData, isDraftChanged: false });
  },
  setIsDraftChanged: (isDraftChanged) => set({ isDraftChanged }),
  resetDraftData: () => {
    const { currentPage } = get();

    set({ draftData: currentPage, isDraftChanged: false });
  },
}));
