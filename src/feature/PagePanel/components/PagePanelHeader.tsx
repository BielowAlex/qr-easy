'use client';
import { usePagePanelStore } from '@/feature/PagePanel';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const LinkButton = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 8,
  color: theme.palette.text.primary,
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const PagePanelHeader: React.FC = () => {
  const { currentPage } = usePagePanelStore();

  const path = usePathname();

  console.log(path);
  const { palette } = useTheme();

  if (!currentPage) {
    return null;
  }

  const currentTranslate = currentPage?.translations.find(
    (el) => el.langId === currentPage?.defaultLangId
  );

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
      <Typography variant={'h3'} sx={{ fontSize: 24 }}>
        {currentTranslate?.name}
      </Typography>
      <Stack>
        <Button disabled={true}>No changes yet</Button>
      </Stack>

      <Stack direction={'row'} gap={12}>
        <LinkButton href={`${path}`}>Open page</LinkButton>
        <LinkButton href={`${path}/products`}>Product list</LinkButton>
        <LinkButton href={'/profile/pages'}>Back to list</LinkButton>
      </Stack>
    </Stack>
  );
};

export { PagePanelHeader };
