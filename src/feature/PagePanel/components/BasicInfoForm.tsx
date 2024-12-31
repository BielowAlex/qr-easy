'use client';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { BASE_URL } from '@/constants';
import { usePagePanelStore } from '@/feature';
import { PagePanelFormHeader } from '@/feature/PagePanel/components/PagePanelFormHeader';
import { api } from '@/lib';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material';
import React, { ChangeEvent } from 'react';

const BasicInfoForm: React.FC = () => {
  const { setDraftData, draftData, saveDraftChange } = usePagePanelStore();

  const { mutateAsync: updatePageById } = api.pages.updateById.useMutation();
  const { palette } = useTheme();

  const handleChangePathname = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!draftData) return;

    const value = e.target.value.toLowerCase().replace(' ', '-');

    setDraftData({ ...draftData, pathname: value });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (!draftData) return;

    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setDraftData({ ...draftData, favicon: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!draftData) {
    return null;
  }
  const handleSavePage = async () => {
    try {
      const isUpdated = await updatePageById({ ...draftData });

      if (isUpdated) {
        saveDraftChange();
        console.log('success');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack>
      <PagePanelFormHeader
        title={'Basic info'}
        description={
          'Here you can modify the basic settings of your page, such as "Brand\n' +
          '          Name," "Website Path," and "System Description of Your Brand."\n' +
          '        '
        }
        onSave={handleSavePage}
      />
      <Stack flex={1} spacing={2} padding={10}>
        <TextField
          label="Brand name"
          value={draftData?.name}
          slotProps={{
            htmlInput: { maxLength: 32 },
          }}
          onChange={(e) => setDraftData({ ...draftData, name: e.target.value })}
        />
        <TextField
          label="Pathname"
          value={draftData?.pathname}
          onChange={handleChangePathname}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ margin: 0 }}>
                  {BASE_URL}/
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Page description(SEO, Social Media)"
          value={draftData?.description}
          onChange={(e) =>
            setDraftData({
              ...draftData,
              description: e.target.value,
            })
          }
          multiline
          rows={3}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="This description will appear when your page is searched on Google or when sharing a link to your website. It serves as a kind of system-level description of your brand.">
                    <HelpOutlineRoundedIcon
                      fontSize={'small'}
                      sx={{ color: palette.grey[300], cursor: 'help' }}
                    />
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />
        <FileDropzone
          acceptedFileTypesStr={'ICO'}
          maxSize={5}
          accept={{
            'image/x-icon': [],
          }}
          onDrop={handleDrop}
        />
      </Stack>
    </Stack>
  );
};

export { BasicInfoForm };
