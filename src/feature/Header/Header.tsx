'use client';
import { AuthButtons, Logo, UserPopup } from '@/feature';
import { useUserStore } from '@/lib/stores/UserStore';
import { AppBar, Stack } from '@mui/material';
import React from 'react';

const Header: React.FC = () => {
  const { isLoggedIn } = useUserStore();

  return (
    <AppBar position="static" sx={{ background: 'none' }}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={'100%'}
        padding={'8px 24px'}
      >
        <Logo />
        {isLoggedIn ? <UserPopup /> : <AuthButtons />}
      </Stack>
    </AppBar>
  );
};

export { Header };
