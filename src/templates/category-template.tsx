import { navigate } from 'gatsby';
import React from 'react';
import { DirectoryNode, MarkdownNode } from '../../types';
import CategoryList from '../components/category-list';
import Layout from '../components/layout';
import Seo from '../components/seo';

type Props = {
  pageContext: {
    name: DirectoryNode['name']; // refactor
    categories: DirectoryNode['name'][];
    postNodes: MarkdownNode[];
  };
};

function CategoryTemplate({ pageContext }: Props) {
  const tabValue = pageContext.name;
  const onChange = (newTabValue: DirectoryNode['name']) => {
    navigate(`/category/${newTabValue}`);
  };

  return (
    <Layout>
      <CategoryList
        categories={pageContext.categories}
        postNodes={pageContext.postNodes}
        tabValue={tabValue}
        onChange={onChange}
        showAllPosts
      />
    </Layout>
  );
}

export function Head({ pageContext }: Props) {
  return (
    <Seo
      title={`카테고리 | ${pageContext.name}`}
      description={`${pageContext.name} 카테고리 글 목록`}
    />
  );
}

export default CategoryTemplate;
