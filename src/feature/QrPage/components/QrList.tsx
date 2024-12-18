'use client';
import { RemoveModal } from '@/components/modals/RemoveModal/RemoveModal';
import { QrCard } from '@/feature/QrPage/components/QrCard';
import { api } from '@/lib';
import { IQRCode } from '@/types/qr-interface';
import { Alert, Grid2, Snackbar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

const Container = styled(Stack)({
  height: '100%',
  overflowY: 'auto',
  padding: '24px',
  paddingTop: 0,
});

const ListContainer = styled(Grid2)({
  padding: '24px',
  width: '100%',
  maxWidth: '1600px !important',
});

interface Props {
  qrList: IQRCode[];
  refetch: () => void;
}

const QrList: React.FC<Props> = ({ qrList, refetch }) => {
  const [selectedQrId, setSelectedQrId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const { mutateAsync: removeQrById } = api.qr.deleteQRCodeById.useMutation();

  const handleCloseRemoveModal = () => {
    setSelectedQrId(null);
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleRemoveQrCode = async () => {
    if (!selectedQrId) return;

    try {
      await removeQrById({ id: selectedQrId });

      refetch();
    } catch (e: any) {
      if ('message' in e) {
        setErrorMessage(e.message);
        setIsSnackbarOpen(true);
      }
    } finally {
      handleCloseRemoveModal();
    }
  };

  return (
    <Container
      alignItems={'center'}
      justifyContent={'flex-start'}
      width={'100%'}
    >
      <ListContainer
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {qrList.map((el) => (
          <QrCard
            key={el.id}
            title={el.title}
            value={el.value}
            id={el.id}
            handleSelectQr={setSelectedQrId}
          />
        ))}
      </ListContainer>
      <RemoveModal
        title={'Remove QR'}
        description={
          'Are you sure you want to delete this QR? There is no way to recover it.'
        }
        handleRemove={handleRemoveQrCode}
        handleCancel={handleCloseRemoveModal}
        isModalOpen={Boolean(selectedQrId)}
      />
      <Snackbar
        open={isSnackbarOpen}
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
    </Container>
  );
};

export { QrList };
