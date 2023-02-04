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
        description: Author['description'];
      };
    };
  };
};

export type DirectoryNode = {
  name: string;
};

export type MarkdownNode = {
  frontmatter: {
    date: Date;
    description: string;
    title: string;
  };
  fields: {
    slug: string;
  };
  html: string;
  id: string;
  excerpt: string;
};

export type IndexQuery = {
  allDirectory: {
    edges: { node: DirectoryNode }[];
  };

  allMarkdownRemark: {
    nodes: MarkdownNode[];
  };
};

export type CreatePagesQuery = {
  data?: IndexQuery;
  error?: unknown;
};

export type Navigator = {
  previous: MarkdownNode | null;
  next: MarkdownNode | null;
};
