'use client';
import { ProfilePopup } from '@/feature/UserPopup/components';
import { useUserStore } from '@/lib/stores/UserStore';
import { Avatar, Badge, Box, Button } from '@mui/material';
import React, { useState } from 'react';

const UserPopup: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const isPopupOpen = Boolean(anchorEl);

  const { user } = useUserStore();

  const handlePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Button onClick={handlePopoverOpen} sx={{ padding: 0 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt={user.nickname} src={user.avatar} />
        </Badge>
      </Button>
      <ProfilePopup
        open={isPopupOpen}
        anchorEl={anchorEl}
        clickAwayPopperHandler={handlePopoverClose}
      />
    </Box>
  );
};

export { UserPopup };
