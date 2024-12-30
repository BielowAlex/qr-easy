'use client';
import { IPage, IPageTranslation } from '@/types';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import WifiPasswordRoundedIcon from '@mui/icons-material/WifiPasswordRounded';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

interface Props {
  page: IPage;
  isMobile: boolean;
}

const PageAbout: React.FC<Props> = ({
  isMobile,
  page: { name, location, openingHours, pathname, translations, defaultLangId },
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentTranslate: IPageTranslation = translations.find(
    (el) => el.langId === defaultLangId
  )!;

  const { palette } = useTheme();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded
    ? currentTranslate.description
    : `${currentTranslate.description.slice(0, 250)}`;

  return (
    <Stack padding={16} gap={4}>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        alignItems={isMobile ? 'flex-start' : 'center'}
        justifyContent={'space-between'}
      >
        <Typography
          variant={'h2'}
          fontSize={'3.3rem'}
          fontWeight={400}
          sx={{ wordBreak: 'break-all' }}
        >
          {name}
        </Typography>
        <Stack gap={4}>
          {location && (
            <Stack direction={'row'} alignItems={'center'} gap={8}>
              <FmdGoodOutlinedIcon
                sx={{ color: palette.grey[500] }}
                fontSize={'small'}
              />

              <Typography
                variant={'subtitle2'}
                fontWeight={500}
                sx={{
                  color: palette.grey[500],
                }}
              >
                {location?.country} - New york - Brodway 13B
              </Typography>
            </Stack>
          )}
          {openingHours && (
            <Stack direction={'row'} alignItems={'center'} gap={8}>
              <QueryBuilderRoundedIcon
                sx={{ color: palette.grey[500] }}
                fontSize={'small'}
              />

              <Typography
                variant={'subtitle2'}
                fontWeight={500}
                sx={{
                  color: palette.grey[500],
                }}
              >
                {openingHours}
              </Typography>
            </Stack>
          )}
          <Stack direction={'row'} alignItems={'center'} gap={8}>
            <WifiPasswordRoundedIcon
              sx={{ color: palette.grey[500] }}
              fontSize={'small'}
            />

            <Typography
              variant={'subtitle2'}
              fontWeight={500}
              sx={{
                color: palette.grey[500],
              }}
            >
              {pathname}2001
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Typography
        paragraph
        variant={'subtitle2'}
        fontWeight={500}
        sx={{
          color: palette.grey[500],
        }}
      >
        {displayText}
        {
          <Button
            sx={{
              display: isExpanded ? 'block' : 'inline',
              cursor: 'pointer',
              fontWeight: 700,
              paddingLeft: 10,
            }}
            variant={'text'}
            onClick={handleToggle}
          >
            {' '}
            {isExpanded ? 'Hide description' : 'Show more'}
          </Button>
        }
      </Typography>
    </Stack>
  );
};

export { PageAbout };
