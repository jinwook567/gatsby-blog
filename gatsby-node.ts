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

const separateMarkdownNodesByCategory = (markdownNodes: MarkdownNode[]) => {
  const posts = new Map<
    string,
    { markdownNode: MarkdownNode; index: number }[]
  >();

  markdownNodes.forEach((markdownNode, index) => {
    const category = markdownNode.fields.slug.split('/')[1];
    posts.set(category, [
      ...(posts.get(category) || []),
      { markdownNode, index },
    ]);
  });
  return posts;
};

const createNavigator = ({
  markdownNodes,
}: {
  markdownNodes: MarkdownNode[];
}) => {
  const posts = separateMarkdownNodesByCategory(markdownNodes);

  const paginations = markdownNodes.map((markdownNode, index) => {
    const allNavigator = {
      previous: markdownNodes[index + 1] || null,
      next: markdownNodes[index - 1] || null,
    };

    const category = markdownNode.fields.slug.split('/')[1];
    const categoryPosts = posts.get(category) || [];
    const categoryPostIndex = categoryPosts.findIndex(
      post => post.index === index
    );

    const categoryNavigator = {
      previous: categoryPosts[categoryPostIndex + 1]
        ? categoryPosts[categoryPostIndex + 1].markdownNode
        : null,
      next: categoryPosts[categoryPostIndex - 1]
        ? categoryPosts[categoryPostIndex - 1].markdownNode
        : null,
    };

    return { allNavigator, categoryNavigator };
  });

  return paginations;
};

const createPostPages = ({
  actions,
  markdownNodes,
}: {
  actions: CreatePageArgs['actions'];
  markdownNodes: MarkdownNode[];
}) => {
  const paginations = createNavigator({ markdownNodes });

  markdownNodes.forEach((markdownNode, index) => {
    actions.createPage({
      path: markdownNode.fields.slug,
      component: path.resolve('./src/templates/post-template.tsx'),
      context: {
        node: markdownNode,
        allNavigator: paginations[index].allNavigator,
        categoryNavigator: paginations[index].categoryNavigator,
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

// 시간 복잡도를 깔끔하게 생각하면서 문제를 해결할 수 있도록..
// 동작하는 로직: markdownNodes에서 동일한 category들을 찾고, 거기서 또 findIndex를 수행하면..
// 위의 동작하는 로직의 문제점은 매번 동일한 category를 찾아야 한다는 것이다.
