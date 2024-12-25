'use client';
import { MenuPopover } from '@/components';
import { DEFAULT_CARD_NO_IMAGE_URL } from '@/constants';
import { api } from '@/lib';
import { IPage } from '@/types';
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
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useState } from 'react';

const CardContainer = styled(Card)({
  width: '100%',
  height: 290,
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 30,
});

const TitleText = styled(Typography)({
  wordBreak: 'break-word',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const DescriptionText = styled(Typography)({
  color: 'text.secondary',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
});

interface Props {
  id: string;
  poster: string | null;
  refetchPageList: () => void;
  page: IPage;
}
const PageCard: React.FC<Props> = ({
  id,
  poster,
  refetchPageList,
  page: { translations, defaultLangId },
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const router = useRouter();
  const { palette } = useTheme();

  const currentTranslate = translations.find(
    (el) => el.langId === defaultLangId
  )!;

  const { mutateAsync: deletePageById } = api.pages.deleteById.useMutation();

  const handleOpenMenuPopover = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleOpenPage = () => {};

  const handleOpenAdminPanel = () => {
    console.log('work');
    router.push(`/profile/pages/${id}`);
  };

  const handleDeletePage = async () => {
    try {
      await deletePageById({
        id,
      });

      refetchPageList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <CardContainer>
        <Stack sx={{ width: '100%', height: '100%' }}>
          <CardMedia
            component="img"
            height="150"
            image={poster || DEFAULT_CARD_NO_IMAGE_URL}
            alt={currentTranslate.name}
            sx={{
              borderBottom: `1px solid ${palette.grey['300']}`,
            }}
          />
          <CardContent>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={'100%'}
            >
              <TitleText gutterBottom variant="h5">
                {currentTranslate.name}
              </TitleText>
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
            <DescriptionText variant="body2">
              {currentTranslate.description}
            </DescriptionText>
          </CardContent>
        </Stack>
      </CardContainer>
    </Grid2>
  );
};

export { PageCard };
