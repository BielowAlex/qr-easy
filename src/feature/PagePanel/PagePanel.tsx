'use client';
import { PageLoader } from '@/components';
import {
  BasicInfoForm,
  PagePanelHeader,
  PagePanelTabs,
  PhoneView,
  PhotosForm,
} from '@/feature';
import { BrowserView } from '@/feature/PagePanel/components/BrowserView';
import { usePagePanelStore } from '@/feature/PagePanel/stores';
import { IPage, PagePanelTabsEnum } from '@/types';
import { Stack, useTheme } from '@mui/material';
import React, { useEffect } from 'react';

interface Props {
  page: IPage;
}

const PagePanel: React.FC<Props> = ({ page }) => {
  const { currentPage, currentPanelTab, setCurrentPage, setDraftData } =
    usePagePanelStore();

  const { palette } = useTheme();

  useEffect(() => {
    if (!page) return;

    setCurrentPage(page);
    setDraftData(page);
  }, [page]);

  if (!currentPage) {
    return <PageLoader />;
  }

  return (
    <Stack height={'100%'} width={'100%'} justifyContent={'flexStart'}>
      <PagePanelHeader />
      <Stack
        direction="row"
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        spacing={4}
        height={'100%'}
      >
        <Stack
          height={'100%'}
          gap={10}
          sx={{
            borderRight: '1px solid',
            borderColor: palette.grey[200],
            flex: 1,
          }}
        >
          <PagePanelTabs />
          {currentPanelTab === PagePanelTabsEnum.BASIC_INFO && (
            <BasicInfoForm />
          )}
          {currentPanelTab === PagePanelTabsEnum.PHOTOS && <PhotosForm />}
          {currentPanelTab === PagePanelTabsEnum.LOCATION && <PhotosForm />}
        </Stack>

        {currentPanelTab === PagePanelTabsEnum.BASIC_INFO ? (
          <BrowserView />
        ) : (
          <PhoneView />
        )}
      </Stack>
    </Stack>
  );
};

export { PagePanel };
