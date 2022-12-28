import React from 'react';
import { GatsbyBrowser } from 'gatsby';
import { RecoilRoot } from 'recoil';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element,
}) => <RecoilRoot>{element}</RecoilRoot>;

export default {};
