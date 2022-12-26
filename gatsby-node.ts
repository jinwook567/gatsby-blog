import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

// eslint-disable-next-line import/prefer-default-export
export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode, basePath: `content` });
    createNodeField({ node, name: `slug`, value });
  }
};
