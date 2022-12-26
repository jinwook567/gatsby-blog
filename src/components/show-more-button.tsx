import { Button, Grid } from '@mui/material';
import { Link } from 'gatsby';
import React from 'react';

type Props = {
  to: string;
};

function ShowMoreButton({ to }: Props) {
  return (
    <Grid container justifyContent="center">
      <Link to={to}>
        <Button size="large">더보기</Button>
      </Link>
    </Grid>
  );
}

export default ShowMoreButton;
