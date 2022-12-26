import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { DirectoryNode } from '../../types';

type Props = {
  categories: DirectoryNode['name'][];
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: DirectoryNode['name']
  ) => void;
  value: DirectoryNode['name'];
};

function CategoryTab({ categories, onChange, value }: Props) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      textColor="primary"
      variant="scrollable"
      scrollButtons={false}
    >
      {categories.map(category => (
        <Tab label={category} value={category} key={category} />
      ))}
    </Tabs>
  );
}

export default CategoryTab;
