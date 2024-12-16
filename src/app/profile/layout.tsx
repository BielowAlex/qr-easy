'use client';
import { MainMenu } from '@/feature';
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
      <Stack
        direction={'row'}
        sx={{
          height: '100%',
        }}
      >
        <MainMenu />
        {children}
      </Stack>
    </Stack>
  );
}
