'use client';
import { PageCard } from '@/feature';
import { IPage } from '@/types/pages-types';
import { Grid2, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Container = styled(Stack)({
  overflowY: 'auto',
  padding: '24px',
  paddingTop: 0,
});

const ListContainer = styled(Grid2)({
  padding: '24px',
  height: '100%',
  maxWidth: '1600px !important',
});

export const mockPages = [
  {
    id: uuidv4(),
    name: 'Whisky bar',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    poster:
      'https://restaumatic-blog-uploads.s3.amazonaws.com/uploads/2023/02/15-1024x768.png',
  },
];

interface Props {
  pageList: IPage[];
  refetchPageList: () => void;
}

const PagesList: React.FC<Props> = ({ pageList, refetchPageList }) => {
  return (
    <Container alignItems={'center'} justifyContent={'center'} width={'100%'}>
      <ListContainer
        container
        spacing={2}
        sx={{ width: '100%' }}
        alignItems="stretch"
      >
        {pageList &&
          pageList.map((el) => (
            <PageCard
              key={el.id}
              id={el.id}
              page={el}
              refetchPageList={refetchPageList}
              poster={el.backgroundUrl}
            />
          ))}
      </ListContainer>
    </Container>
  );
};

export { PagesList };
