export type Author = {
  name: string;
  description: string;
  social: {
    github: string;
    instagram: string;
    email: string;
  };
};

export type BioQuery = {
  site: {
    siteMetadata: {
      author: Author;
    };
  };
};

export type SeoQuery = {
  site: {
    siteMetadata: {
      title: string;
      author: {
        name: Author['name'];
      };
    };
  };
};
