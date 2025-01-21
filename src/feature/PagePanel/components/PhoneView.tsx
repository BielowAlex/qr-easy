'use client';
import PhoneImage from '@/assets/page-panel/phone-wrapper.png';
import { MyPage, usePagePanelStore } from '@/feature';
import { Stack } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import React from 'react';

const PreviewContainer = styled(Stack)({
  position: 'relative',
  borderRadius: 2,
  overflow: 'hidden',
  height: 'fill-available',
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
  padding: '0 13px',
  paddingRight: 0,
  scrollbarWidth: 'thin',
});

const PhoneView: React.FC = () => {
  const { currentPage } = usePagePanelStore();

  return (
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
  );
};

export { PhoneView };
