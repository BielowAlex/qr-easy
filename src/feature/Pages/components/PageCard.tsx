'use client';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';

const CardContainer = styled(Card)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 30,
});

interface Props {
  id: string;
  poster: string;
  name: string;
  description: string;
}
const PageCard: React.FC<Props> = ({ poster, name, description }) => {
  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <CardContainer>
        <CardActionArea sx={{ width: '100%' }}>
          <CardMedia component="img" height="140" image={poster} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Open
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
          <Button size="small" color="primary">
            Add products
          </Button>
        </CardActions>
      </CardContainer>
    </Grid2>
  );
};

export { PageCard };
