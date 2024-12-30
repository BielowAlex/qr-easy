'use client';
import { PageLoader } from '@/components';
import { MyPage, PhotosForm } from '@/feature';
import { PagePanelHeader } from '@/feature/PagePanel/components';
import { BasicInfoForm } from '@/feature/PagePanel/components/BasicInfoForm';
import { usePagePanelStore } from '@/feature/PagePanel/stores';
import { IPage, PagePanelTabsEnum } from '@/types';
import { Stack, Tab, Tabs, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import PhoneImage from '../../assets/page-panel/phone-wrapper.png';

const PreviewContainer = styled(Stack)({
  position: 'relative',
  borderRadius: 2,
  overflow: 'hidden',
  minHeight: '90dvh',
  maxWidth: 450,
});
const PhoneDisplayContainer = styled(Stack)({
  position: 'absolute',
  top: '30px',
  left: '5%',
  width: '90%',
  height: '94%',
  zIndex: 5,
  overflowY: 'auto',
  borderRadius: 18,
  padding: '3px 13px',
  paddingRight: 0,
  scrollbarWidth: 'thin',
});

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
          width={'50%'}
          gap={10}
          sx={{ borderRight: '1px solid', borderColor: palette.grey[200] }}
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
        <PreviewContainer
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          flex={1}
        >
          <Image
            src={PhoneImage}
            alt={'phone'}
            style={{ zIndex: '10', pointerEvents: 'none' }}
            fill
            priority
          />

          <PhoneDisplayContainer
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
          >
            <MyPage
              page={currentPage}
              isMobile={true}
              sx={{ height: '100%', paddingBottom: 50 }}
            />
          </PhoneDisplayContainer>
        </PreviewContainer>
      </Stack>
    </Stack>
  );
};

export { PagePanel };
