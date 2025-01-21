'use client';
import { PageAbout, PageHeader, PageMenu, usePagePanelStore } from '@/feature';
import { useBreakpoints } from '@/hooks';
import { IPage } from '@/types';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { CSSProperties, useEffect } from 'react';

const Hero = styled(Stack)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 300,
  minHeight: 250,
  backgroundPosition: 'center',

  [theme.breakpoints.up('sm')]: {
    height: 350,
  },
  [theme.breakpoints.up('md')]: {
    height: 400,
  },
  [theme.breakpoints.up('lg')]: {
    height: 600,
  },
}));

interface Props {
  page: IPage | null;
  isMobile?: boolean;
  sx?: CSSProperties;
}

const MyPage: React.FC<Props> = ({ isMobile, sx, page }) => {
  const { currentPage, setCurrentPage, draftData } = usePagePanelStore();

  const data: IPage | null =
    !currentPage && !draftData
      ? null
      : ({ ...currentPage, ...draftData } as IPage);

  const pathname = usePathname();
  const { isXs } = useBreakpoints();
  const { palette } = useTheme();

  const isMobileVersion = typeof isMobile !== 'undefined' ? isMobile : isXs;

  useEffect(() => {
    if (!page) return;

    setCurrentPage(page);
  }, [page]);

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const { backgroundUrl, logoUrl, name } = data as IPage;

  return (
    <Stack sx={{ position: 'relative', width: '100%', ...sx }}>
      <PageHeader logoUrl={logoUrl} name={name} />
      <Hero
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          background: backgroundUrl
            ? `url('${backgroundUrl}')`
            : palette.grey[600],
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          filter: backgroundUrl ? 'none' : 'blur(2px)',
        }}
      >
        {!isMobileVersion && (
          <Stack alignItems={'center'} gap={15}>
            <Typography
              sx={{ color: '#FFF', fontSize: 28, textAlign: 'center' }}
            >
              Ta jakość, ten smak, ten wystrój - jedyne Sushi Art <br />
              Wici 32 Łódź
            </Typography>
            <Button
              component={Link}
              sx={{ width: 'fit-content', padding: '5px 15px' }}
              variant={'contained'}
              href={`${pathname}/menu`}
            >
              Open menu
            </Button>
          </Stack>
        )}
      </Hero>
      <PageAbout page={data} isMobile={isMobileVersion} />
      {isMobileVersion && <PageMenu />}
    </Stack>
  );
};

export { MyPage };
