import { usePagePanelStore } from '@/feature';
import { Stack, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

interface Props {
  title: string;
  description?: string;
  onSave: () => void;
}

const PagePanelFormHeader: React.FC<Props> = ({
  title,
  description,
  onSave,
}) => {
  const { isDraftChanged, resetDraftData } = usePagePanelStore();

  const { palette } = useTheme();

  return (
    <Stack padding={10} paddingTop={0}>
      <Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant={'h3'} fontSize={24}>
            {title}
          </Typography>
          <Stack direction={'row'} justifyContent={'center'} gap={10}>
            <Button
              disabled={!isDraftChanged}
              variant={'text'}
              sx={{ fontSize: 18, fontWeight: 400 }}
              onClick={resetDraftData}
            >
              Reset
            </Button>
            <Button
              disabled={!isDraftChanged}
              variant={'text'}
              sx={{ fontSize: 18, fontWeight: 400 }}
              onClick={onSave}
            >
              Save
            </Button>
          </Stack>
        </Stack>
        {description && (
          <Typography variant={'subtitle2'} color={palette.grey['500']}>
            {description}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export { PagePanelFormHeader };
