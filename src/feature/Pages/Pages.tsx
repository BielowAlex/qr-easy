'use client';
import { PageHeader } from '@/components';
import { PagesList } from '@/feature';
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const Container = styled(Stack)({});

const Pages: React.FC = () => {
  return (
    <Container height={'100%'} width={'100%'} justifyContent={'flexStart'}>
      <PageHeader title={'My pages'} count={13} handleCreateNew={() => {}} />
      <PagesList />
    </Container>
  );
};

export { Pages };
