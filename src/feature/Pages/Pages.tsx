'use client';
import { CreatePageModal, PageHeader } from '@/components';
import { PagesList } from '@/feature';
import { api } from '@/lib';
import { Stack } from '@mui/material';
import React, { useState } from 'react';

const Pages: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const { data: pages, refetch } = api.pages.getAll.useQuery();

  return (
    <Stack height={'100%'} width={'100%'} justifyContent={'flexStart'}>
      <PageHeader
        title={'My pages'}
        count={13}
        handleCreateNew={() => setIsCreateModalOpen(true)}
      />
      <PagesList pageList={pages || []} refetchPageList={refetch} />
      <CreatePageModal
        isModalOpen={isCreateModalOpen}
        handleCancel={() => setIsCreateModalOpen(false)}
        refetch={refetch}
      />
    </Stack>
  );
};

export { Pages };
