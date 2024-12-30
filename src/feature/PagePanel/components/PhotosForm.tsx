'use client';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { usePagePanelStore } from '@/feature';
import { PagePanelFormHeader } from '@/feature/PagePanel/components/PagePanelFormHeader';
import { api } from '@/lib';
import { Avatar, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface DropzoneProps {
  photo: string | null;
  setPhoto: (url: string) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ photo, setPhoto }) => {
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={'center'}
      spacing={2}
    >
      <FileDropzone
        acceptedFileTypesStr={'(JPG, PNG, SVG)'}
        maxSize={20}
        accept={{
          'image/*': [],
          'image/svg+xml': [],
        }}
        onDrop={handleDrop}
      />
      <Avatar
        alt={'loaded photo '}
        src={photo ? photo : undefined}
        sx={{ width: 200, height: 200 }}
      />
    </Stack>
  );
};

const PhotosForm: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const { draftData, setDraftData, setIsDraftChanged } = usePagePanelStore();

  const { mutateAsync: updatePageById } = api.pages.updateById.useMutation();
  // const { palette } = useTheme();

  const handleLogoChange = (logoUrl: string) => {
    if (!draftData) return;

    setDraftData({
      ...draftData,
      logoUrl,
    });

    setLogo(logoUrl);
  };

  const handleBannerChange = (backgroundUrl: string) => {
    if (!draftData) return;

    setDraftData({
      ...draftData,
      backgroundUrl,
    });

    setBanner(backgroundUrl);
  };

  const handleSavePage = async () => {
    if (!draftData) return;

    try {
      const isUpdated = await updatePageById({ ...draftData });

      if (isUpdated) {
        setIsDraftChanged(false);
        console.log('success');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (draftData) {
      setLogo(draftData.logoUrl);
      setBanner(draftData.backgroundUrl);
    }
  }, [draftData]);

  return (
    <Stack>
      <PagePanelFormHeader title={'Photos'} onSave={handleSavePage} />
      <Stack spacing={4} padding={10}>
        <Typography variant="h6">Logo</Typography>
        <Dropzone photo={logo} setPhoto={handleLogoChange} />

        <Typography variant="h6">Poster</Typography>
        <Dropzone photo={banner} setPhoto={handleBannerChange} />
      </Stack>
    </Stack>
  );
};

export { PhotosForm };
