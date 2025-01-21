'use client';
import { PageInfoBlock } from '@/feature';
import { IPage } from '@/types';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import WifiPasswordRoundedIcon from '@mui/icons-material/WifiPasswordRounded';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface Props {
  page: IPage;
  isMobile: boolean;
}

const PageAbout: React.FC<Props> = ({
  isMobile,
  page: { name, location, openingHours, pathname },
}) => {
  const currentLocationText = location
    ? `${location.address}, ${location?.city}, ${location?.country}`
    : undefined;

  const { palette } = useTheme();

  return (
    <Stack
      justifyContent={'flex-start'}
      sx={{
        width: '100%',
        minHeight: 'fit-content',
        overflow: 'hidden',
      }}
    >
      <Stack
        alignItems={'flex-start'}
        justifyContent={'space-between'}
        width={'100%'}
        padding={10}
        sx={{
          background: palette.common.black,
        }}
      >
        <Typography
          variant={'h2'}
          fontSize={28}
          fontWeight={700}
          color={palette.primary.contrastText}
          sx={{ wordBreak: 'break-all' }}
        >
          {name}
        </Typography>
        {isMobile &&
          currentLocationText &&
          (location?.googleUrl ? (
            <Link
              href={location.googleUrl}
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                textDecoration: 'none',
              }}
            >
              <FmdGoodOutlinedIcon
                sx={{ color: palette.text.secondary, fontSize: 16 }}
              />
              <Typography
                variant={'subtitle2'}
                fontSize={12}
                fontWeight={400}
                color={palette.text.secondary}
              >
                {currentLocationText}
              </Typography>
            </Link>
          ) : (
            <Stack
              direction={'row'}
              gap={4}
              sx={{
                textDecoration: 'none',
              }}
            >
              <FmdGoodOutlinedIcon
                sx={{ color: palette.text.secondary, fontSize: 16 }}
              />
              <Typography
                variant={'subtitle2'}
                fontSize={12}
                fontWeight={400}
                color={palette.text.secondary}
              >
                {currentLocationText}
              </Typography>
            </Stack>
          ))}
      </Stack>
      <Divider variant={'fullWidth'} flexItem />

      {!isMobile && (
        <Stack
          direction={'row'}
          justifyContent={'flex-start'}
          gap={8}
          padding={16}
          sx={{
            background: palette.primary.main,
          }}
        >
          {location && (
            <PageInfoBlock
              title={'Address:'}
              infoText={`Brodway 13B, New york, ${location?.country}`}
              href={location?.googleUrl}
              linkIcon={
                <FmdGoodOutlinedIcon
                  sx={{ color: palette.text.secondary, fontSize: 16 }}
                />
              }
              linkText={'Open'}
            />
          )}

          <Divider orientation="vertical" flexItem />

          {openingHours && (
            <PageInfoBlock
              title={'Working hours:'}
              infoText={openingHours}
              linkIcon={
                <QueryBuilderRoundedIcon
                  sx={{ color: palette.text.secondary, fontSize: 16 }}
                />
              }
            />
          )}
          <Divider orientation="vertical" flexItem />
          <PageInfoBlock
            title={'Wifi:'}
            infoText={`${pathname}2001`}
            linkIcon={
              <WifiPasswordRoundedIcon
                sx={{ color: palette.text.secondary, fontSize: 16 }}
              />
            }
          />
        </Stack>
      )}
    </Stack>
  );
};

export { PageAbout };
