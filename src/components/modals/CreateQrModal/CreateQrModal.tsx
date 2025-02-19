'use client';
import { ModalHeader } from '@/components';
import { api } from '@/lib';
import { checkIsUrlValid } from '@/lib/utils/checkIsUrlValid.util';
import { ICreateQrBody } from '@/types/qr-types';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import {
  Alert,
  FormControl,
  Input,
  Modal,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import React, { useRef, useState } from 'react';

const ModalContainer = styled(Modal)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100dvh',
  zIndex: 1600,
});

const Container = styled(Stack)(({ theme }) => ({
  position: 'relative',
  background: theme.palette.background.paper,
  padding: 24,
  borderRadius: 12,
  gap: 32,
  width: '100%',
  maxWidth: 400,
}));

interface Props {
  refetch: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
}

const CreateQrModal: React.FC<Props> = ({
  isModalOpen,
  handleCancel,
  refetch,
}) => {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [inputLink, setInputLink] = useState<string>('');
  const [inputTitle, setInputTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Стан для помилки
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); // Стан для Snackbar

  const isUrlValid: boolean = checkIsUrlValid(inputLink);

  const { palette } = useTheme();

  const { mutateAsync: createQr } = api.qr.createQRCode.useMutation();

  const handleQrCreate = async () => {
    if (!qrRef.current || !isUrlValid) return;

    const imageBase64 = qrRef.current.toDataURL('image/png');

    const body: ICreateQrBody = {
      value: inputLink.trim(),
      title: inputTitle.trim(),
      imageBase64,
    };

    try {
      await createQr(body);

      refetch();

      handleCancel();
    } catch (e: any) {
      if ('message' in e) {
        setErrorMessage(e.message);
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setErrorMessage(null);
  };

  return (
    <>
      <ModalContainer open={isModalOpen}>
        <Container>
          <Stack width={'100%'} gap={24}>
            <ModalHeader
              icon={<QrCodeScannerIcon />}
              handleCancel={handleCancel}
            />
            <Stack gap={4}>
              <Typography variant={'h3'}>Create linked QR</Typography>
              <Typography variant={'subtitle2'} color={palette.grey['500']}>
                To generate a QR code from a link, enter the URL in the field
                below. If it passes validation, click the &#34;Create QR&quot;
                button.
              </Typography>
            </Stack>
            <FormControl defaultValue={inputLink} required>
              <Typography>Title *</Typography>
              <Input
                placeholder="Google"
                value={inputTitle}
                error={inputTitle.length < 2}
                onChange={(e) => setInputTitle(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl defaultValue={inputLink} required>
              <Typography>QR-code link * </Typography>
              <Input
                placeholder="www.google.com"
                value={inputLink}
                error={!isUrlValid && inputLink.length > 0}
                onChange={(e) => setInputLink(e.currentTarget.value.trim())}
              />
            </FormControl>
            <Stack
              direction={'row'}
              justifyContent={'center'}
              width={'100%'}
              sx={{
                minHeight: 128,
                filter: 'blur(4px)',
              }}
            >
              {isUrlValid && inputLink.length > 0 ? (
                <QRCodeCanvas value={inputLink} ref={qrRef} />
              ) : (
                <QRCodeSVG value={'Glory to Ukraine'} />
              )}
            </Stack>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={'100%'}
            >
              <Button
                variant={'outlined'}
                sx={{ maxWidth: 160 }}
                onClick={handleCancel}
              >
                <Typography fontWeight={600} fontSize={14}>
                  Cancel
                </Typography>
              </Button>
              <Button
                variant={'contained'}
                sx={{ maxWidth: 160 }}
                disabled={
                  !isUrlValid ||
                  inputLink.length === 0 ||
                  inputTitle.trim().length < 2
                }
                onClick={handleQrCreate}
              >
                <Typography fontWeight={600} fontSize={14}>
                  Create QR
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </ModalContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        sx={{
          zIndex: 999999,
        }}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export { CreateQrModal };
