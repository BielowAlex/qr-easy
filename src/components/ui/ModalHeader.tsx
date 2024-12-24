import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import React, { ReactNode } from 'react';

const IconContainer = styled(Box)(({ theme }) => ({
  maxHeight: 52,
  padding: '14px 14px',
  background: theme.palette.grey['100'],
  borderRadius: '50%',
}));

interface Props {
  handleCancel: () => void;
  icon: ReactNode;
}

const ModalHeader: React.FC<Props> = ({ handleCancel, icon }) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      width={'100%'}
      sx={{ zIndex: 10 }}
    >
      <IconContainer>{icon}</IconContainer>
      <IconButton
        onClick={handleCancel}
        sx={{ padding: 5, width: 34, height: 34 }}
      >
        <CloseRoundedIcon sx={{ fontSize: '24px' }} />
      </IconButton>
    </Stack>
  );
};

export { ModalHeader };
