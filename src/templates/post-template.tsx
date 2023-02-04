import React from 'react';
import 'github-markdown-css/github-markdown-light.css';
import { useRecoilValue } from 'recoil';
import { Grid, Typography } from '@mui/material';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import { MarkdownNode, Navigator } from '../../types';
import Layout from '../components/layout';
import PostNavigator from '../components/post-navigator';
import Seo from '../components/seo';
import categoryState from '../atoms';

type Props = {
  pageContext: {
    allNavigator: Navigator;
    categoryNavigator: Navigator;
    node: MarkdownNode;
  };
};

function PostTemplate({ pageContext }: Props) {
  const { allNavigator, categoryNavigator, node } = pageContext;
  const categoryName = node.fields.slug.split('/')[1];
  const tabValue = useRecoilValue(categoryState);

  return (
    <Layout>
      <Link
        to={`/category/${categoryName}`}
        css={css`
          &:hover {
            text-decoration: underline;
          }
        `}
      >
        <Typography variant="body1">{categoryName}</Typography>
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: node.html }}
      />

      <Grid sx={{ marginTop: 5 }}>
        <PostNavigator
          previous={
            tabValue === 'ALL'
              ? allNavigator.previous
              : categoryNavigator.previous
          }
          next={tabValue === 'ALL' ? allNavigator.next : categoryNavigator.next}
        />
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
