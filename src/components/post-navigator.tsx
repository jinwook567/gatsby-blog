import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { MarkdownNode } from '../../types';

type Props = {
  previous: MarkdownNode | null;
  next: MarkdownNode | null;
};

function PostNavigator({ previous, next }: Props) {
  return (
    <Grid container justifyContent="space-between">
      {[previous, next].map((node, index) => (
        <Grid item key={node ? node.id : index}>
          {node && (
            <Link
              to={node.fields.slug}
              css={css`
                &:hover {
                  & > div {
                    text-decoration: underline;
                  }
                }
              `}
            >
              <Grid container columnGap={1} alignItems="center">
                {index === 0 && <WestIcon />}
                <Typography variant="h5">{node.frontmatter.title}</Typography>
                {index === 1 && <EastIcon />}
              </Grid>
            </Link>
          )}
        </Grid>
      ))}
    </Grid>
  );
}

export default PostNavigator;
