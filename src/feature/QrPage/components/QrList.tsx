'use client';
import { QrCard } from '@/feature/QrPage/components/QrCard';
import { IQRCode } from '@/types/qr-interface';
import { Grid2, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

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
}

const QrList: React.FC<Props> = ({ qrList }) => {
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
          <QrCard key={el.id} title={el.title} value={el.value} id={el.id} />
        ))}
      </ListContainer>
    </Container>
  );
};

export { QrList };
