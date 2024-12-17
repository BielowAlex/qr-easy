'use client';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import React from 'react';

const LoaderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const CircularProgressWithIcon: React.FC<{ icon: React.ReactNode }> = ({
  icon,
}) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress size={50} />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};

const PageLoader: React.FC = () => {
  return (
    <LoaderContainer>
      <CircularProgressWithIcon icon={<QrCodeScannerIcon />} />
      <Typography variant="h3">Loading</Typography>
    </LoaderContainer>
  );
};

export { PageLoader };
