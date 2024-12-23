'use client';
import { MenuPopover } from '@/components';
import { DEFAULT_CARD_NO_IMAGE_URL } from '@/constants';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DisplaySettingsRoundedIcon from '@mui/icons-material/DisplaySettingsRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid2,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { MouseEvent, useState } from 'react';

const CardContainer = styled(Card)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 30,
});

interface Props {
  id: string;
  poster: string | null;
  name: string;
  description: string;
}
const PageCard: React.FC<Props> = ({ poster, name, description }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleOpenMenuPopover = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleOpenPage = () => {};
  const handleOpenAdminPanel = () => {};
  const handleDeletePage = () => {};

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <CardContainer>
        <Stack sx={{ width: '100%' }}>
          <CardMedia
            component="img"
            height="150"
            image={poster || DEFAULT_CARD_NO_IMAGE_URL}
            alt={name}
          />
          <CardContent>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={'100%'}
            >
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <IconButton onClick={handleOpenMenuPopover}>
                <MoreVertRoundedIcon />
              </IconButton>
              <MenuPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                <MenuItem
                  disableRipple
                  sx={{ gap: 8 }}
                  onClick={handleOpenPage}
                >
                  <OpenInNewRoundedIcon fontSize={'small'} />
                  <Typography variant={'h4'} fontSize={16} fontWeight={600}>
                    Open page
                  </Typography>
                </MenuItem>
                <MenuItem
                  disableRipple
                  sx={{ gap: 8 }}
                  onClick={handleOpenAdminPanel}
                >
                  <DisplaySettingsRoundedIcon fontSize={'small'} />
                  <Typography variant={'h4'} fontSize={16} fontWeight={600}>
                    Admin Panel
                  </Typography>
                </MenuItem>
                <Divider
                  flexItem
                  sx={{
                    margin: '0 !important',
                  }}
                />
                <MenuItem
                  disableRipple
                  sx={{ gap: 8 }}
                  onClick={handleDeletePage}
                >
                  <DeleteOutlineRoundedIcon fontSize={'small'} />
                  <Typography variant={'h4'} fontSize={16} fontWeight={600}>
                    Delete
                  </Typography>
                </MenuItem>
              </MenuPopover>
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </CardContent>
        </Stack>
      </CardContainer>
    </Grid2>
  );
};

export { PageCard };
