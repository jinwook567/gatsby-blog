import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import Bio from './bio';
import { BioQuery } from '../../types';
import Footer from './footer';
import './layout.css';

type Props = {
  children: React.ReactNode;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#101010',
    },
    secondary: {
      main: '#d3d3d3',
    },
  },
});

const Container = styled(Grid)`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  padding-left: 20px;
  max-width: 700px;
`;

const bioQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
          description
          social {
            github
            instagram
            email
          }
        }
      }
    }
  }
`;

function Layout({ children }: Props) {
  const data = useStaticQuery<BioQuery>(bioQuery);
  const { author } = data.site.siteMetadata;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid component="header" marginTop={3} marginBottom={8}>
          <Bio author={author} />
        </Grid>

        <Grid component="main" sx={{ flex: 1 }} marginBottom={8}>
          {children}
        </Grid>

        <Grid component="footer" marginBottom={1}>
          <Footer author={author} />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
