import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';

const PageMenu: React.FC = () => {
  return (
    <Stack>
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={10}
        sx={{ width: '100%' }}
      >
        <Divider sx={{ flex: 1 }} />
        <Typography variant={'h3'} sx={{ minWidth: 'fit-content' }}>
          Digital Menu
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Stack>
      <Stack padding={16} gap={8}>
        <Skeleton width={'100%'} height={72} sx={{ transform: 'unset' }} />
        <Skeleton width={'100%'} height={72} sx={{ transform: 'unset' }} />
        <Skeleton width={'100%'} height={72} sx={{ transform: 'unset' }} />
        <Skeleton width={'100%'} height={72} sx={{ transform: 'unset' }} />
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={10}
        sx={{ width: '100%' }}
      >
        <Divider sx={{ flex: 1 }} />
        <Typography variant={'h3'} sx={{ minWidth: 'fit-content' }}>
          Other
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Stack>
      <Stack padding={16} gap={8}>
        <Skeleton width={'100%'} height={72} sx={{ transform: 'unset' }} />
        <Skeleton width={'100%'} height={72} sx={{ transform: 'unset' }} />
      </Stack>
    </Stack>
  );
};

export { PageMenu };
