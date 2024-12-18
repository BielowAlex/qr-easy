'use client';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { IconButton, Modal, Stack, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';

const ModalContainer = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  zIndex: 1600,
  backgroundColor: 'rgba(0, 0, 0, 0.01)',
});

const Container = styled(Stack)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.background.paper,
  padding: 24,
  borderRadius: 12,
  gap: 32,
  maxWidth: 400,
}));

const IconContainer = styled(Box)(({ theme }) => ({
  maxHeight: 52,
  padding: '14px 14px',
  background: theme.palette.error.light,
  borderRadius: '50%',
}));

interface Props {
  title: string;
  description: string;
  acceptButtonText?: string;
  cancelButtonText?: string;
  handleRemove: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
}

const RemoveModal: React.FC<Props> = ({
  isModalOpen,
  handleRemove,
  handleCancel,
  title,
  description,
  acceptButtonText,
  cancelButtonText,
}) => {
  const { palette } = useTheme();

  const handleRemoveAndCancel = () => {
    handleRemove();
    handleCancel();
  };
  return (
    <ModalContainer open={isModalOpen}>
      <Container>
        <Stack gap={17}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            width={'100%'}
            sx={{ zIndex: 10 }}
          >
            <IconContainer>
              <DeleteOutlineRoundedIcon
                sx={{ color: palette.error.contrastText }}
              />
            </IconContainer>
            <IconButton
              onClick={handleCancel}
              sx={{ padding: 5, width: 34, height: 34 }}
            >
              <CloseRoundedIcon
                sx={{
                  fontSize: '24px',
                }}
              />
            </IconButton>
          </Stack>
          <Stack sx={{ zIndex: 10 }} gap={4}>
            <Typography variant={'h3'}>{title}</Typography>
            <Typography variant={'subtitle2'} color={palette.grey['500']}>
              {description}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          gap={12}
          sx={{ zIndex: 10 }}
        >
          <Button
            variant={'outlined'}
            sx={{ maxWidth: 180 }}
            onClick={handleCancel}
          >
            {cancelButtonText || 'Cancel'}
          </Button>
          <Button
            variant={'contained'}
            sx={{ maxWidth: 180, background: palette.error.main }}
            onClick={handleRemoveAndCancel}
          >
            {acceptButtonText || 'Delete'}
          </Button>
        </Stack>
      </Container>
    </ModalContainer>
  );
};

export { RemoveModal };
