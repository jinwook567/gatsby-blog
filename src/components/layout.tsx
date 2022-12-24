import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import { css } from '@emotion/react';
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

const containerStyle = css`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  padding-left: 20px;
  max-width: 700px;
`;

function Layout({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Container css={containerStyle}>
        <Grid component="header" marginTop={3}>
          bio
        </Grid>

        <Grid component="main" sx={{ flex: 1 }}>
          {children}
        </Grid>

        <Grid component="footer" marginBottom={1}>
          footer
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
