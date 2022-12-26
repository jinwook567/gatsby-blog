import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import { Grid, Typography } from '@mui/material';
import { MarkdownNode } from '../../types';

type Props = {
  node: MarkdownNode;
};

const formatDate = (targetDate: Date) => {
  const date = new Date(targetDate).toISOString();
  return date.slice(0, 10);
};

function PostCard({ node }: Props) {
  return (
    <Link
      to={node.fields.slug}
      css={css`
        &:hover {
          & > div > h4 {
            text-decoration: underline;
          }
        }
      `}
    >
      <Grid container rowGap={1} direction="column">
        <Typography variant="h4">{node.frontmatter.title}</Typography>
        <Typography variant="h5">{node.frontmatter.description}</Typography>
        <Typography variant="body2">{node.excerpt}</Typography>
        <Typography variant="body2" color="secondary">
          {formatDate(node.frontmatter.date)}
        </Typography>
      </Grid>
    </Link>
  );
}

export default PostCard;
