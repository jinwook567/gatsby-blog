import React from 'react';
import { Grid } from '@mui/material';
import { MarkdownNode } from '../../types';
import PostCard from './post-card';

type Props = {
  nodes: MarkdownNode[];
};

function PostList({ nodes }: Props) {
  return (
    <Grid rowGap={5} container direction="column">
      {nodes.map(node => (
        <PostCard node={node} key={node.id} />
      ))}
    </Grid>
  );
}

export default PostList;
