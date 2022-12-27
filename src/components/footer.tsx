import React from 'react';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import { Author } from '../../types';

type Props = {
  author: Author;
};

const StyledLink = styled.a`
  text-decoration: underline;
`;

function Footer({ author }: Props) {
  const year = new Date().getFullYear();
  return (
    <Grid>
      {`© ${year} ${author.name}, Powered by `}
      <StyledLink href="https://github.com/jinwook567/gatsby-blog">
        gatsby-blog
      </StyledLink>
    </Grid>
  );
}

export default Footer;
