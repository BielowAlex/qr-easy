'use client';
import { PageLoader } from '@/components';
import { PhotosForm } from '@/feature';
import { PagePanelHeader } from '@/feature/PagePanel/components';
import { BasicInfoForm } from '@/feature/PagePanel/components/BasicInfoForm';
import { BrowserView } from '@/feature/PagePanel/components/BrowserView';
import { PhoneView } from '@/feature/PagePanel/components/PhoneView';
import { usePagePanelStore } from '@/feature/PagePanel/stores';
import { IPage, PagePanelTabsEnum } from '@/types';
import { Stack, Tab, Tabs, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  page: IPage;
}

const PagePanel: React.FC<Props> = ({ page }) => {
  const { currentPage, setCurrentPage, setDraftData } = usePagePanelStore();

  const [currentTab, setCurrentTab] = useState<PagePanelTabsEnum>(
    PagePanelTabsEnum.BASIC_INFO
  );

  const { palette } = useTheme();

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: PagePanelTabsEnum
  ) => {
    setCurrentTab(newValue);
  };

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
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              borderBottom: '1px solid',
              borderColor: palette.grey[200],
            }}
          >
            <Tab
              value={PagePanelTabsEnum.BASIC_INFO}
              label={'Basic Info'}
              sx={{ fontWeight: 600 }}
            />
            <Tab
              value={PagePanelTabsEnum.PHOTOS}
              label={'Photos'}
              sx={{ fontWeight: 600 }}
            />
            <Tab
              value={PagePanelTabsEnum.DESCRIPTION}
              label={'Description'}
              sx={{ fontWeight: 600 }}
            />
          </Tabs>
          {currentTab === PagePanelTabsEnum.BASIC_INFO && <BasicInfoForm />}
          {currentTab === PagePanelTabsEnum.PHOTOS && <PhotosForm />}
        </Stack>

        {currentTab === PagePanelTabsEnum.BASIC_INFO ? (
          <BrowserView />
        ) : (
          <PhoneView />
        )}
      </Stack>
    </Stack>
  );
};

export { PagePanel };
