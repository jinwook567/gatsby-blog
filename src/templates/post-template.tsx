import React from 'react';
import 'github-markdown-css/github-markdown-light.css';
import { Grid, Typography } from '@mui/material';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import { MarkdownNode } from '../../types';
import Layout from '../components/layout';
import PostNavigator from '../components/post-navigator';
import Seo from '../components/seo';

type Props = {
  pageContext: {
    previous: MarkdownNode | null;
    next: MarkdownNode | null;
    node: MarkdownNode;
  };
};

function PostTemplate({ pageContext }: Props) {
  const { next, previous, node } = pageContext;
  const categoryName = node.fields.slug.split('/')[1];

  return (
    <Layout>
      <Link
        to={`/category/${categoryName}`}
        css={css`
          &:hover {
            text-decoration: underline;
          }
          font-weight: 500;
        `}
      >
        {categoryName}
      </Link>

      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        {node.frontmatter.title}
      </Typography>

      <section
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: node.html }}
      />

      <Grid sx={{ marginTop: 5 }}>
        <PostNavigator previous={previous} next={next} />
      </Grid>
    </Layout>
  );
}

export function Head({ pageContext }: Props) {
  const { node } = pageContext;
  return (
    <Seo
      title={node.frontmatter.title}
      description={node.frontmatter.description}
    />
  );
}

export default PostTemplate;
