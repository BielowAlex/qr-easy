'use client';
import { CreateQrModal, PageHeader } from '@/components';
import { QrList } from '@/feature';
import { api } from '@/lib';
import { Stack } from '@mui/material';
import React, { useState } from 'react';

const QrPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const { data, refetch } = api.qr.getAll.useQuery();

  return (
    <Stack height={'100%'} width={'100%'} justifyContent={'flexStart'}>
      <PageHeader
        title={'My QR-s'}
        count={data?.length ?? 0}
        handleCreateNew={() => setIsCreateModalOpen(true)}
      />
      <QrList qrList={data || []} refetch={refetch} />
      <CreateQrModal
        refetch={refetch}
        isModalOpen={isCreateModalOpen}
        handleCancel={() => setIsCreateModalOpen(false)}
      />
    </Stack>
  );
};

export { QrPage };
