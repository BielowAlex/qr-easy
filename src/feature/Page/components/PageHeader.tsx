'use client';
import {
  AppBar,
  Avatar,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const ItemWrapper = styled(Stack)(({ theme }) => ({
  background: '#fff',
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  padding: 4,
  borderRadius: 8,
}));

interface Props {
  logoUrl: string | null;
  name: string;
}

const PageHeader: React.FC<Props> = ({ logoUrl, name }) => {
  return (
    <AppBar
      position="absolute"
      sx={{ background: 'transparent', padding: 10, boxShadow: 'none' }}
    >
      <Stack
        alignItems={'center'}
        direction={'row'}
        justifyContent={'space-between'}
      >
        {logoUrl ? (
          <Avatar
            alt={'loaded photo '}
            src={logoUrl}
            sx={{ width: 54, height: 54 }}
          />
        ) : (
          <ItemWrapper alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h3'}>{name}</Typography>
          </ItemWrapper>
        )}

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={10}
        >
          <Tooltip title={'Search products'}>
            <ItemWrapper sx={{ padding: 14 }}>
              <SearchRoundedIcon />
            </ItemWrapper>
          </Tooltip>
          {/*TODO: need add all translation and translation changing logic*/}
          <Select
            value={'EN'}
            label={'Language'}
            defaultValue={'EN'}
            sx={{
              fontSize: 14,
              background: '#fff',
              borderRadius: 8,
            }}
          >
            <MenuItem value={'EN'}>EN</MenuItem>
            <MenuItem value={'UA'}>UA</MenuItem>
          </Select>
        </Stack>
      </Stack>
    </AppBar>
  );
};

export { PageHeader };
