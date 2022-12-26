import { Grid } from '@mui/material';
import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { DirectoryNode, MarkdownNode } from '../../types';
import CategoryTab from './category-tab';
import PostList from './post-list';
import ShowMoreButton from './show-more-button';

type Props = {
  categories: DirectoryNode['name'][];
  initialSelectedCategory: DirectoryNode['name'];
  postNodes: MarkdownNode[];
  showAllPosts: boolean;
};

function CategoryList({
  categories,
  initialSelectedCategory,
  postNodes,
  showAllPosts,
}: Props) {
  const [tabValue, setTabValue] = useState(initialSelectedCategory);

  const tabNodes =
    tabValue === 'ALL'
      ? postNodes
      : postNodes.filter(node => {
          const category = node.fields.slug.split('/')[1];
          return category === tabValue;
        });

  const handleTabValue = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setTabValue(newValue);

    if (showAllPosts) {
      navigate(`/category/${newValue}`);
    }
  };

  const maxPostsCnt = 5;

  return (
    <Grid>
      <Grid marginBottom={10}>
        <CategoryTab
          categories={categories}
          value={tabValue}
          onChange={handleTabValue}
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
