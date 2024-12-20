import { Menu } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  anchorEl: null | HTMLButtonElement;
  setAnchorEl: (el: null | HTMLButtonElement) => void;
  children: ReactNode;
}

const MenuPopover: React.FC<Props> = ({ anchorEl, setAnchorEl, children }) => {
  return (
    <Menu
      id="demo-customized-menu"
      MenuListProps={{
        sx: { padding: 0 },
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      sx={{ padding: 0 }}
    >
      {children}
    </Menu>
  );
};

export { MenuPopover };
