import React from 'react';
import { DirectoryNode, MarkdownNode } from '../../types';
import CategoryList from '../components/category-list';
import Layout from '../components/layout';

type Props = {
  pageContext: {
    name: DirectoryNode['name']; // refactor
    categories: DirectoryNode['name'][];
    postNodes: MarkdownNode[];
  };
};

function CategoryTemplate({ pageContext }: Props) {
  return (
    <Layout>
      <CategoryList
        categories={pageContext.categories}
        postNodes={pageContext.postNodes}
        initialSelectedCategory={pageContext.name}
        showAllPosts
      />
    </Layout>
  );
  return <div>CategoryTemplate</div>;
}

export default CategoryTemplate;
