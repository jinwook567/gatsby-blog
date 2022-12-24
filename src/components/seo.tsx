import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { SeoQuery } from '../../types';

type Props = {
  title: 'default' | string;
  description: string;
};

const seoQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
  }
`;

function Seo({ title, description }: Props) {
  const data = useStaticQuery<SeoQuery>(seoQuery);
  const { siteMetadata } = data.site;

  return (
    <>
      <title>{title === 'default' ? siteMetadata.title : title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={data.site.siteMetadata.author.name} />
    </>
  );
}

export default Seo;
