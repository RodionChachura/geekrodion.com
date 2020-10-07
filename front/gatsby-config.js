module.exports = {
  siteMetadata: {
    title: `Rodion Chachura Website`,
    description: `Hi! I'm Rodion Chachura, also known as geekrodion. You may know me as a creator of increaser.org and booksconcepts.com.`,
    author: `Rodion Chachura`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: { },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `nunito\:400,600`,
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-amplitude-analytics`,
      options: {
        apiKey: "afe86075776de93239aa05c74e64baed",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          `gatsby-remark-external-links`,
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              // Optional:
      
              // the github handler whose gists are to be accessed
              username: "RodionChachura",
      
              // a flag indicating whether the github default gist css should be included or not
              // default: true
              // gistDefaultCssInclude: true,
      
              // a flag indicating whether the github default gist css should be preloaded or not
              // use this if you want to load the default css asynchronously.
              // default: false
              // gistCssPreload: true,
      
              // a string that represents the github default gist css url.
              // defaults: "https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
              // gistCssUrlAddress: "<string>"
            }
          }
        ]
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://geekrodion.com`,
      },
    },
    `gatsby-transformer-json`,

  ]
}
