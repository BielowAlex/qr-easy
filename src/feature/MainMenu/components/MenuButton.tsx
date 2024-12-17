'use client';
import { Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import React from 'react';

const Container = styled(Link)<{ active: boolean }>(({ theme, active }) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 8,
  color: theme.palette.primary.contrastText,
  '&:hover .menu-button': {
    border: ` 1px solid #7B7B7B`,
    background: active
      ? 'linear-gradient(138deg, #535353 11.03%, #414141 96.77%)'
      : 'rgba(65,65,65,0.44)',
  },
}));

const IconContainer = styled(Stack)<{ active: boolean }>(({ active }) => ({
  border: ` 1px solid ${active ? '#7B7B7B' : 'rgba(0,0,0,0)'}`,
  borderRadius: 13,
  padding: 12,
  background: active
    ? 'linear-gradient(138deg, #535353 11.03%, #414141 96.77%)'
    : 'inherit',
  '&:hover': {
    border: ` 1px solid #7B7B7B`,
    background: active
      ? 'linear-gradient(138deg, #535353 11.03%, #414141 96.77%)'
      : 'rgba(65,65,65,0.44)',
  },
}));

interface Props {
  icon: React.ReactNode;
  href: string;
  label: string;
  isActive: boolean;
  isSmall: boolean;
}

const MenuButton: React.FC<Props> = ({
  href,
  label,
  icon,
  isActive = false,
  isSmall = true,
}) => {
  return (
    <Tooltip title={label} placement={'right'}>
      <Container href={href} active={isActive}>
        <IconContainer
          justifyContent={'center'}
          alignItems={'center'}
          className={'menu-button'}
          active={isActive}
        >
          {icon}
        </IconContainer>
        {!isSmall && (
          <Typography
            variant="body1"
            sx={{ fontWeight: 300, color: isActive ? '#FFF' : '#717680' }}
          >
            {label}
          </Typography>
        )}
      </Container>
    </Tooltip>
  );
};

export { MenuButton };