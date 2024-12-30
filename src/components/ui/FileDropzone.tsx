import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

const UploadContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '24px',
  backgroundColor: 'white',
  width: '100%',
  padding: '24px',
  textAlign: 'center',
  gap: '12px',
  cursor: 'pointer',
  position: 'relative',
  border: '2px solid #E9EAEB',
  transition: 'border 0.3s ease',
  '&:hover .drag-file-icon': {
    opacity: 1,
  },
  '&:hover': {
    border: '2px solid #0B0F15',
  },
});

const Description = styled(Typography)({
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: 1.4,
  color: '#535862',
});

const LogoContainer = styled(Box)({
  display: 'flex',
  width: '42px',
  height: '42px',
  border: '1px solid #E9EAEB',
  padding: '10px',
  borderRadius: '8px',
  boxShadow:
    '0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px  rgba(10, 13, 18, 0.05)',
});

const DescriptionContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
});

interface IProps {
  onDrop?: (files: File[]) => void;
  accept: Accept;
  maxSize: number;
  acceptedFileTypesStr: string;
}

const FileDropzone: React.FC<IProps> = ({
  onDrop,
  accept,
  maxSize,
  acceptedFileTypesStr,
}) => {
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Uploaded files:', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop || handleDrop,
    accept,
    maxSize: maxSize * 1024 * 1024,
  });

  return (
    <UploadContainer {...getRootProps()}>
      <input {...getInputProps()} />
      <LogoContainer>
        <CloudUploadRoundedIcon />
      </LogoContainer>

      <DescriptionContainer>
        <Box sx={{ display: 'flex', gap: '4px' }}>
          <Description sx={{ fontWeight: 600, color: 'black' }}>
            Click to upload new File
          </Description>
          <Description>or drag and drop</Description>
        </Box>
        <Description>
          {acceptedFileTypesStr} (max. {maxSize}mb)
        </Description>
      </DescriptionContainer>
    </UploadContainer>
  );
};

export { FileDropzone };
