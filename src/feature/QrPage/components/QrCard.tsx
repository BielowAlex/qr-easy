'use client';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import {
  Card,
  CardContent,
  Divider,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useRef, useState } from 'react';

const CardContainer = styled(Card)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 30,
  minWidth: 256,
});

interface Props {
  id: string;
  title: string;
  value: string;
  handleSelectQr: (id: string) => void;
}

const QrCard: React.FC<Props> = ({ id, value, title, handleSelectQr }) => {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleDeleteQr = () => {
    handleSelectQr(id);
    setAnchorEl(null);
  };

  const handleDownloadQRCode = () => {
    if (qrRef.current) {
      const link = document.createElement('a');
      link.href = qrRef.current.toDataURL('image/png');
      link.download = `qreasy-${title.toLowerCase().replace(' ', '-')}.png`;
      link.click();
    }
  };

  const handleOpenInNewTab = () => {
    if (typeof window !== 'undefined') {
      window.open(value, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Grid2
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      height={336}
      sx={{ maxHeight: 336 }}
    >
      <CardContainer>
        <Stack sx={{ width: '100%', minWidth: 256 }}>
          <Stack justifyContent={'center'} alignItems={'center'}>
            <QRCodeCanvas value={value} size={256} ref={qrRef} marginSize={2} />
          </Stack>
          <CardContent>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={'100%'}
            >
              <Typography variant="h5">{title}</Typography>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVertRoundedIcon />
              </IconButton>
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
                <MenuItem
                  disableRipple
                  sx={{ gap: 8 }}
                  onClick={handleOpenInNewTab}
                >
                  <OpenInNewRoundedIcon fontSize={'small'} />
                  <Typography variant={'h4'} fontSize={16} fontWeight={600}>
                    Open
                  </Typography>
                </MenuItem>
                <MenuItem
                  disableRipple
                  sx={{ gap: 8 }}
                  onClick={handleDownloadQRCode}
                >
                  <DownloadRoundedIcon fontSize={'small'} />
                  <Typography variant={'h4'} fontSize={16} fontWeight={600}>
                    Download
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
                  onClick={handleDeleteQr}
                >
                  <DeleteOutlineRoundedIcon fontSize={'small'} />
                  <Typography variant={'h4'} fontSize={16} fontWeight={600}>
                    Delete
                  </Typography>
                </MenuItem>
              </Menu>
            </Stack>
          </CardContent>
        </Stack>
      </CardContainer>
    </Grid2>
  );
};

export { QrCard };
