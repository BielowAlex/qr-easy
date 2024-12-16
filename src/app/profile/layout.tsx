'use client';
import { Header } from '@/feature';
import { Stack } from '@mui/material';
import React from 'react';

export default function FoldersLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <Stack
      sx={{
        height: '100dvh',
        width: '100%',
      }}
    >
      <Header />
      {children}
    </Stack>
  );
}
