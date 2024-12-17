'use client';
import { PageHeader } from '@/components';
import { QrList } from '@/feature/QrPage/components';
import { Stack } from '@mui/material';
import React from 'react';

const QrPage: React.FC = () => {
  return (
    <Stack height={'100%'} width={'100%'} justifyContent={'flexStart'}>
      <PageHeader title={'My QR-s'} count={0} handleCreateNew={() => {}} />
      <QrList />
    </Stack>
  );
};

export { QrPage };
