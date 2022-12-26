import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { MarkdownNode } from '../../types';
import CategoryTab from './category-tab';
import PostList from './post-list';

type Props = {
  categories: string[];
  initialSelectedCategory: string;
  postNodes: MarkdownNode[];
};

function CategoryList({
  categories,
  initialSelectedCategory,
  postNodes,
}: Props) {
  const [tabValue, setTabValue] = useState(initialSelectedCategory);

  const categoryNodes =
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
  };

  // category-tab과 post-list 컴포넌트 들어가야함.
  // post-lis에는 post-card가 들어가야함.
  // CategoryList는 더보기 버튼(썸네일) 유무에 따라 handleTabValue가 달라져야함. navigate

  // post-list의 경우 더보기 버튼이 있다면 5개까지, 아니라면 전부.
  // 더보기 버튼에 따라서 onChange, button 2개가 변경이 됨. 리팩토링 생각..
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
        <PostList nodes={categoryNodes} />
      </Grid>
    </Grid>
  );
}

export default CategoryList;
