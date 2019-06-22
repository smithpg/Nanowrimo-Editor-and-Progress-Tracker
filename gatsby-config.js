const siteConfig = require('./site-config');
const path = require('path');

module.exports = {
  siteMetadata: {
    ...siteConfig,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-eslint`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-webpack-size`,
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        components: path.join(__dirname, 'src/components'),
        constants: path.join(__dirname, 'src/constants'),
        helpers: path.join(__dirname, 'src/helpers'),
        store: path.join(__dirname, 'src/store'),
        layouts: path.join(__dirname, 'src/layouts'),
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /images\/.*\.svg$/,
        },
      },
    },
  ],
};
