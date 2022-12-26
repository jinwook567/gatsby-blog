import type { GatsbyConfig } from 'gatsby';
import myConfig from './gatsby-my-config';

const config: GatsbyConfig = {
  siteMetadata: myConfig.siteMetadata,
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: myConfig.ga.trackingIds,
        pluginConfig: {
          head: true,
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: myConfig.siteMetadata.title,
        short_name: myConfig.siteMetadata.title,
        start_url: '/',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: './content',
      },
    },
  ],
};

export default config;
