import { GatsbyNode, CreatePageArgs } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';
import path from 'path';
import { CreatePagesQuery, DirectoryNode, MarkdownNode } from './types';

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

const createCategoryPages = ({
  actions,
  markdownNodes,
  directoryNodes,
}: {
  actions: CreatePageArgs['actions'];
  markdownNodes: MarkdownNode[];
  directoryNodes: DirectoryNode[];
}) => {
  directoryNodes.unshift({ name: 'ALL' });

  directoryNodes.forEach(directoryNode => {
    actions.createPage({
      path: `/category/${directoryNode.name}`,
      component: path.resolve('./src/templates/category-template.tsx'),
      context: {
        name: directoryNode.name,
        categories: directoryNodes.map(node => node.name),
        postNodes: markdownNodes,
      },
    });
  });
};

const createPostPages = ({
  actions,
  markdownNodes,
}: {
  actions: CreatePageArgs['actions'];
  markdownNodes: MarkdownNode[];
}) => {
  markdownNodes.forEach((markdownNode, index) => {
    actions.createPage({
      path: markdownNode.fields.slug,
      component: path.resolve('./src/templates/post-template.tsx'),
      context: {
        node: markdownNode,
        previous:
          index === markdownNodes.length - 1 ? null : markdownNodes[index + 1],
        next: index === 0 ? null : markdownNodes[index - 1],
      },
    });
  });
};

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const response: CreatePagesQuery = await graphql(`
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
  `);

  if (response.error) {
    reporter.panicOnBuild(`graphql query error ${response.error}`);
    return;
  }

  if (!response.data) return;

  const directoryNodes = response.data.allDirectory.edges.map(
    ({ node }) => node
  );
  const markdownNodes = response.data.allMarkdownRemark.nodes;

  createCategoryPages({ actions, markdownNodes, directoryNodes });
  createPostPages({ actions, markdownNodes });
};
