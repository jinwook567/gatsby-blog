import { Tab, Tabs } from '@mui/material';
import React from 'react';

type Props = {
  categories: string[];
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => void;
  value: string;
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
