'use client';
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

const AuthButtons: React.FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/auth/sign-in');
  };

  return (
    <Stack direction={'row'} alignItems={'center'} gap={8}>
      <Button
        variant="outlined"
        sx={{ padding: '5px 10px' }}
        onClick={handleSignIn}
      >
        <Typography variant={'h3'} fontSize={12} sx={{ lineHeight: 1.3 }}>
          Try for free
        </Typography>
      </Button>
      <Button onClick={handleSignIn}>
        <Typography variant={'h3'} fontSize={12}>
          Sign-in
        </Typography>
      </Button>
    </Stack>
  );
};

export { AuthButtons };
