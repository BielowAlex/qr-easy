'use client';
import { QrCard } from '@/feature/QrPage/components/QrCard';
import { api } from '@/lib';
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
  height: '100%',
  width: '100%',
  maxWidth: '1600px !important',
});

const QrList: React.FC = () => {
  const { data = [] } = api.qr.getAll.useQuery<IQRCode[]>();

  return (
    <Container
      alignItems={'center'}
      justifyContent={'flex-start'}
      width={'100%'}
    >
      <ListContainer
        container
        justifyContent="space-between"
        sx={{
          justifyContent: {
            xs: 'space-between',
            sm: 'space-between',
            md: data.length >= 3 ? 'space-between' : 'flex-start',
            lg: data.length >= 4 ? 'space-between' : 'flex-start',
          },
        }}
        spacing={2}
      >
        {data.map((el) => (
          <QrCard key={el.id} title={el.title} value={el.value} id={el.id} />
        ))}
      </ListContainer>
    </Container>
  );
};

export { QrList };
