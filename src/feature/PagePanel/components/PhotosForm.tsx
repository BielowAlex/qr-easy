'use client';
import { PhotosDropzone, usePagePanelStore } from '@/feature';
import { PagePanelFormHeader } from '@/feature/PagePanel/components/PagePanelFormHeader';
import { api } from '@/lib';
import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const PhotosForm: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const { draftData, setDraftData, saveDraftChange } = usePagePanelStore();

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
        saveDraftChange();
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
      <PagePanelFormHeader
        title={'Photos'}
        onSave={handleSavePage}
        description={
          "Here you can update your brand's images, such as the logo and the main banner of your website, and instantly see the result (for PC users)."
        }
      />
      <Stack gap={10} padding={10}>
        <Typography variant="h6">Brand Logo</Typography>
        <PhotosDropzone photo={logo} setPhoto={handleLogoChange} />
        <Typography variant="h6">Main Banner</Typography>
        <PhotosDropzone photo={banner} setPhoto={handleBannerChange} />
      </Stack>
    </Stack>
  );
};

export { PhotosForm };
