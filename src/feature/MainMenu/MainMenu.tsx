'use client';
import { MenuButton, SidebarIcon, UserPopup } from '@/feature';
import { useUserStore } from '@/lib/stores/UserStore';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Divider, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const Container = styled(Stack)(({ theme }) => ({
  maxWidth: '200px',
  padding: '41px 28px',
  boxShadow:
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);',
  background: theme.palette.common.black,
}));

const ButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  color: theme.palette.common.white,
  maxWidth: '90px',
  wordBreak: 'break-word',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const StyledButton = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  border: ` 1px solid rgba(0,0,0,0)`,
  width: '100%',
  gap: 8,
  '&:hover .sidebar-hover': {
    border: ` 1px solid #7B7B7B`,
    background: 'rgba(65,65,65,0.44)',
  },
}));

const IconContainer = styled(Stack)(() => ({
  border: ` 1px solid rgba(0,0,0,0)`,
  borderRadius: 13,
  padding: 12,
  '&:hover': {
    border: ` 1px solid #7B7B7B`,
    background: 'rgba(65,65,65,0.44)',
  },
}));

const MainMenu: React.FC = () => {
  const [isSmall, setIsSmall] = useState<boolean>(true);
  const pathname = usePathname();

  const { user } = useUserStore();
  const sidebarToggle = () => {
    setIsSmall((prev) => !prev);
  };

  return (
    <Container justifyContent={'space-between'} alignItems={'center'}>
      <QrCodeScannerIcon
        sx={{ color: '#fff', fontSize: 48 }}
        fontSize={'large'}
      />
      <Stack gap={18}>
        <StyledButton variant={'text'} onClick={sidebarToggle}>
          <IconContainer className={'sidebar-hover'}>
            <SidebarIcon />
          </IconContainer>
          {!isSmall && <ButtonText variant="body1">Hide sidebar</ButtonText>}
        </StyledButton>
        <Divider />
        <MenuButton
          href={'/profile'}
          label={'Dashboard'}
          isSmall={isSmall}
          icon={
            <DashboardRoundedIcon
              sx={{ color: pathname === '/profile' ? '#fff' : '#717680' }}
            />
          }
          isActive={pathname === '/profile'}
        />
        <MenuButton
          href={'/profile/pages'}
          isSmall={isSmall}
          label={'My pages'}
          icon={
            <AutoStoriesRoundedIcon
              sx={{ color: pathname.includes('pages') ? '#fff' : '#717680' }}
            />
          }
          isActive={pathname.includes('pages')}
        />
        <MenuButton
          href={'/profile/qr'}
          isSmall={isSmall}
          label={'My QR-s'}
          icon={
            <QrCode2RoundedIcon
              sx={{ color: pathname.includes('qr') ? '#fff' : '#717680' }}
            />
          }
          isActive={pathname.includes('qr')}
        />

        <MenuButton
          href={'/profile/pages'}
          isSmall={isSmall}
          label={'Setting'}
          icon={
            <TuneRoundedIcon
              sx={{ color: pathname.includes('settings') ? '#fff' : '#717680' }}
            />
          }
          isActive={pathname.includes('settings')}
        />
      </Stack>
      <Stack direction={'row'}>
        <UserPopup />
        {!isSmall && <ButtonText variant="body1">{user?.firstName}</ButtonText>}
      </Stack>
    </Container>
  );
};

export { MainMenu };
