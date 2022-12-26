import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { IndexQuery } from '../../types';
import CategoryList from '../components/category-list';
import Layout from '../components/layout';
import Seo from '../components/seo';

const indexQuery = graphql`
  query {
    allDirectory(
      filter: {
        sourceInstanceName: { eq: "content" }
        relativeDirectory: { eq: "" }
      }
    ) {
      edges {
        node {
          name
        }
      }
    }

    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        fields {
          slug
        }
        excerpt(pruneLength: 250, truncate: true)
        frontmatter {
          date
          description
          title
        }
        html
        id
      }
    }
  }
`;

function IndexPage() {
  const data = useStaticQuery<IndexQuery>(indexQuery);
  const postNodes = data.allMarkdownRemark.nodes;
  const edges = [{ node: { name: 'ALL' } }, ...data.allDirectory.edges];
  const categories = edges.map(({ node }) => node.name);

  return (
    <Layout>
      <CategoryList
        categories={categories}
        initialSelectedCategory="ALL"
        postNodes={postNodes}
        showAllPosts={false}
      />
    </Layout>
  );
}

export function Head() {
  return <Seo title="default" description="blog main page" />;
}

export default IndexPage;
