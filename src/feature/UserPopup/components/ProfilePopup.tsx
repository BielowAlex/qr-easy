import { ThemeSwitcher } from '@/feature/UserPopup/components/ThemeSwitcher';
import { ShortcutIcons } from '@/feature/UserPopup/icons';
import { useUserStore } from '@/lib/stores/UserStore';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Badge, Popover, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Container = styled(Popover)({
  zIndex: 1600,
  minWidth: '280px',
  maxWidth: '350px',
  borderRadius: '12px',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.grey['50'],
  borderBottom: `2px solid ${theme.palette.grey['200']}`,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));
const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '14px',
  color: theme.palette.text.primary,
  maxWidth: 200,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const UserEmail = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '14px',
  color: theme.palette.text.secondary,
  maxWidth: 200,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  marginTop: '16px',
  width: '100%',
  justifyContent: 'flex-start',
  borderRadius: '12px',
  textTransform: 'none',
  borderColor: theme.palette.divider,
  fontSize: '14px',
  fontWeight: 500,
}));

interface Props {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  clickAwayPopperHandler: (
    event: globalThis.MouseEvent | globalThis.TouchEvent
  ) => void;
}

const Overlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'none',
  zIndex: 1500,
  pointerEvents: 'all',
});

const ProfilePopup: React.FC<Props> = ({
  open,
  anchorEl,
  clickAwayPopperHandler,
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();
  const { palette } = useTheme();

  const { user } = useUserStore();

  const handleOpenProfilePage = () => {
    router.push('/profile');
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    setIsLoggingOut(false);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {isLoggingOut && <Overlay />}
      <Container
        open={open}
        anchorEl={anchorEl}
        onClose={clickAwayPopperHandler}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <StyledPaper>
          <Stack
            gap={16}
            padding={12}
            sx={{
              borderBottom: '1px solid #E9EAEB',
              borderRadius: 12,
              background: palette.background.default,
            }}
          >
            <Typography variant="subtitle1" fontSize={12} fontWeight={600}>
              Signed is as:
            </Typography>
            <Stack direction="row" gap={8} alignItems="center">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt={user?.nickname} src={user?.avatar} />
              </StyledBadge>
              <Stack>
                {user?.nickname && <UserName>{user?.nickname}</UserName>}
                {user?.email && <UserEmail>{user.email}</UserEmail>}
              </Stack>
            </Stack>
            <Stack
              direction={'row'}
              width={'100%'}
              justifyContent={'space-between'}
            >
              <Button onClick={handleOpenProfilePage}>
                <Typography variant={'h4'} fontWeight={600}>
                  Open profile
                </Typography>
              </Button>
              <ThemeSwitcher />
            </Stack>
          </Stack>
          <Stack direction={'row'} sx={{ padding: 14, paddingTop: 12 }}>
            <LogoutButton
              variant="text"
              startIcon={
                isLoggingOut ? (
                  <CircularProgress size={16} />
                ) : (
                  <LogoutOutlinedIcon
                    fontSize={'small'}
                    sx={{
                      color: '#717680',
                    }}
                  />
                )
              }
              sx={{ margin: 0 }}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <Typography variant={'h4'} fontWeight={600}>
                Sign out
              </Typography>
            </LogoutButton>

            <Box
              sx={{
                padding: '1px 4px',
                border: '1px solid #E9EAEB',
                borderRadius: 8,
              }}
            >
              <ShortcutIcons />
            </Box>
          </Stack>
        </StyledPaper>
      </Container>
    </>
  );
};

export { ProfilePopup };
