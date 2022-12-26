/* eslint-disable react/require-default-props */
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { SeoQuery } from '../../types';

type Props = {
  title?: string;
  description?: string;
};

const seoQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
          description
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
      <title>{title || siteMetadata.title}</title>
      <meta
        name="description"
        content={description || siteMetadata.author.description}
      />
      <meta name="author" content={data.site.siteMetadata.author.name} />
    </>
  );
}

export default Seo;
