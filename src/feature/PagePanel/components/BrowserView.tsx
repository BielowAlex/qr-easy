import Logo from '@/assets/favicon.ico';
import { BASE_URL } from '@/constants';
import { usePagePanelStore } from '@/feature';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Image from 'next/image';
import React from 'react';

const PreviewContainer = styled(Stack)({
  position: 'relative',
  borderRadius: 2,
  overflow: 'hidden',
  minHeight: '90dvh',
  maxWidth: 450,
});

const BrowserView: React.FC = () => {
  const { draftData } = usePagePanelStore();

  const { palette } = useTheme();

  return (
    <PreviewContainer
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      flex={1}
    >
      <Stack width={'100%'} sx={{ background: palette.grey['800'] }}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          padding={5}
          gap={10}
          paddingBottom={0}
        >
          <LanguageRoundedIcon sx={{ color: '#fff' }} />
          <Stack
            direction={'row'}
            gap={10}
            padding={5}
            alignItems={'center'}
            sx={{
              background: palette.grey['700'],
              borderRadius: '12px 12px 0px 0px',
            }}
          >
            <Image
              src={draftData?.favicon || Logo}
              alt={'logo'}
              width={18}
              height={18}
            />
            <Typography
              color={'white'}
              sx={{
                maxWidth: 240,
                wordBreak: 'break-word',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {draftData?.name}
            </Typography>
            <CloseRoundedIcon sx={{ fontSize: 16, color: '#fff' }} />
          </Stack>
        </Stack>
        <Stack
          direction={'row'}
          sx={{ background: palette.grey['700'] }}
          padding={10}
          paddingRight={0}
          gap={10}
          alignItems={'center'}
        >
          <Stack direction={'row'} gap={10}>
            <ArrowBackRoundedIcon sx={{ color: '#fff' }} />
            <ArrowForwardRoundedIcon sx={{ color: palette.grey[400] }} />
            <ReplayRoundedIcon sx={{ color: '#fff' }} />
          </Stack>
          <Stack
            direction={'row'}
            width={'100%'}
            padding={5}
            paddingLeft={15}
            sx={{
              background: palette.grey['800'],
              borderRadius: '24px 0 0 24px',
            }}
          >
            <Typography
              color={'white'}
              sx={{
                maxWidth: 317,
                wordBreak: 'break-word',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {BASE_URL}/{draftData?.pathname}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </PreviewContainer>
  );
};

export { BrowserView };
