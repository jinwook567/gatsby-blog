import React from 'react';
import { Grid } from '@mui/material';
import { Author } from '../../types';

type Props = {
  author: Author;
};

function Footer({ author }: Props) {
  const year = new Date().getFullYear();
  return <Grid>{`© ${year} ${author.name}, Built with Gatsby`}</Grid>;
}

export default Footer;
