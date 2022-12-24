import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';

function IndexPage() {
  return <Layout>indexPage</Layout>;
}

export function Head() {
  return <Seo title="default" description="blog main page" />;
}

export default IndexPage;
