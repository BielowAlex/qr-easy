'use client';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

interface Props {
  title: string;
  count: number;
  handleCreateNew?: () => void;
}

const PageHeader: React.FC<Props> = ({ title, count, handleCreateNew }) => {
  const { palette } = useTheme();

  return (
    <Stack
      direction={'row'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={24}
      sx={{
        borderBottom: `1px solid ${palette.grey['200']}`,
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={8}
      >
        <Typography variant={'h3'} sx={{ fontSize: 24 }}>
          {title}
        </Typography>
        <Typography
          variant={'h4'}
          sx={{
            background: '#FFF',
            padding: '2px 6px',
            border: `1px solid ${palette.grey['300']}`,
            borderRadius: 8,
          }}
        >
          {count}
        </Typography>
      </Stack>
      {handleCreateNew && (
        <Button
          variant={'outlined'}
          sx={{ maxWidth: 'fit-content', padding: '5px 15px' }}
          endIcon={<NoteAddRoundedIcon />}
          onClick={handleCreateNew}
        >
          Create new
        </Button>
      )}
    </Stack>
  );
};

export { PageHeader };
