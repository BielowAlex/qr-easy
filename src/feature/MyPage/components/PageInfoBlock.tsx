'use client';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface Props {
  title: string;
  infoText: string;
  href?: string | null;
  linkText?: string;
  linkIcon?: ReactNode;
}

const PageInfoBlock: React.FC<Props> = ({
  title,
  infoText,
  href,
  linkText,
  linkIcon,
}) => {
  const { palette } = useTheme();

  return (
    <Stack alignItems={'flex-start'} justifyContent={'flex-start'} gap={4}>
      <Stack direction={'row'} alignItems={'center'} gap={4}>
        {linkIcon}
        <Typography
          variant={'subtitle2'}
          fontSize={13}
          fontWeight={500}
          sx={{
            color: palette.text.secondary,
          }}
        >
          {title}
        </Typography>
      </Stack>

      <Typography
        fontWeight={600}
        fontSize={14}
        sx={{
          color: palette.primary.contrastText,
        }}
      >
        {infoText}
      </Typography>
      {href && linkText && (
        <Button
          variant={'text'}
          component={Link}
          href={href}
          sx={{
            textAlign: 'start',
            gap: 4,
            justifyContent: 'flex-start',
            width: 'fit-content',
            textDecoration: 'underline',
          }}
        >
          <Typography
            fontSize={12}
            fontWeight={500}
            sx={{ color: palette.text.secondary }}
          >
            {linkText}
          </Typography>
        </Button>
      )}
    </Stack>
  );
};

export { PageInfoBlock };
