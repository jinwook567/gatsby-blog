import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'gatsby';
import { Author } from '../../types';
import SocialIconButton from './social-icon-button';

type Props = {
  author: Author;
};

function Bio({ author }: Props) {
  type Service = keyof typeof author.social;
  const services = Object.keys(author.social) as Service[];

  return (
    <Grid rowSpacing={1} container direction="column">
      <Grid item>
        <Link to="/">
          <Typography variant="h4" fontWeight={500}>
            {author.name}
          </Typography>
        </Link>
      </Grid>

      <Grid item>
        <Typography variant="body1">{author.description}</Typography>
      </Grid>

      <Grid item>
        {services.map(service => {
          const url = author.social[service];
          return (
            url && (
              <SocialIconButton service={service} url={url} key={service} />
            )
          );
        })}
      </Grid>
    </Grid>
  );
}

export default Bio;
