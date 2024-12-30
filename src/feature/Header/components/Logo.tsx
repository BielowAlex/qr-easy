import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
  const { palette } = useTheme();

  return (
    <Link
      href={'/'}
      style={{
        width: 'fit-content',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: palette.primary.contrastText,
      }}
    >
      <QrCodeScannerIcon />
      <Typography
        fontWeight={'bold'}
        fontSize={'large'}
        color={palette.primary.contrastText}
      >
        QReasy
      </Typography>
    </Link>
  );
};

export { Logo };
