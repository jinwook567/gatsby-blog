import React from 'react';
import { Grid } from '@mui/material';
import { DirectoryNode, MarkdownNode } from '../../types';
import CategoryTab from './category-tab';
import PostList from './post-list';
import ShowMoreButton from './show-more-button';

type Props = {
  categories: DirectoryNode['name'][];
  tabValue: DirectoryNode['name'];
  onChange: (newTabValue: DirectoryNode['name']) => void;
  postNodes: MarkdownNode[];
  showAllPosts: boolean;
};

function CategoryList({
  categories,
  tabValue,
  onChange,
  postNodes,
  showAllPosts,
}: Props) {
  const tabNodes =
    tabValue === 'ALL'
      ? postNodes
      : postNodes.filter(node => {
          const category = node.fields.slug.split('/')[1];
          return category === tabValue;
        });

  const maxPostsCnt = 5;

  return (
    <Grid>
      <Grid marginBottom={10}>
        <CategoryTab
          categories={categories}
          value={tabValue}
          onChange={(e, newValue) => onChange(newValue)}
        />
      </Grid>

      <Grid>
        <PostList
          nodes={showAllPosts ? tabNodes : tabNodes.slice(0, maxPostsCnt)}
        />
      </Grid>

      {!showAllPosts && tabNodes.length > maxPostsCnt && (
        <Grid marginTop={5}>
          <ShowMoreButton to={`/category/${tabValue}`} />
        </Grid>
      )}
    </Grid>
  );
}

export default CategoryList;
