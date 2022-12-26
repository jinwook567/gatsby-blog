import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const config = {
  siteMetadata: {
    title: `gatsby-blog`,
    siteUrl: 'https://www.yourdomain.tld',
    author: {
      name: 'jinwook',
      description: 'This is my blog',
      social: {
        github: 'https://github.com/jinwook567',
        email: 'dlwlsdnr567@naver.com',
        instagram: '',
      },
    },
  },
  ga: {
    trackingIds: [process.env.GA_TRACKING_ID].filter(id => id),
  },
};

export default config;
