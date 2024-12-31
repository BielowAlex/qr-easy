'use client';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { Avatar, Stack } from '@mui/material';
import React from 'react';

interface DropzoneProps {
  photo: string | null;
  setPhoto: (url: string) => void;
}

const PhotosDropzone: React.FC<DropzoneProps> = ({ photo, setPhoto }) => {
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

export { PhotosDropzone };
