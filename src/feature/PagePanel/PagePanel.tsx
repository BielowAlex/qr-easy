'use client';
import { PageLoader } from '@/components';
import { PagePanelHeader } from '@/feature/PagePanel/components';
import { usePagePanelStore } from '@/feature/PagePanel/stores';
import { IPage } from '@/types';
import { Stack } from '@mui/material';
import React, { useEffect } from 'react';

interface Props {
  page: IPage;
}

const PagePanel: React.FC<Props> = ({ page }) => {
  const { currentPage, setCurrentPage } = usePagePanelStore();

  useEffect(() => {
    setCurrentPage(page);
  }, [page, setCurrentPage]);

  if (!currentPage) {
    return <PageLoader />;
  }

  return (
    <Stack height={'100%'} width={'100%'} justifyContent={'flexStart'}>
      <PagePanelHeader />
    </Stack>
  );
};

export { PagePanel };
