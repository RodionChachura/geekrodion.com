module.exports = {
  siteMetadata: {
    title: `Rodion Chachura Website`,
    description: `Hi! I'm Rodion Chachura, also known as geekrodion. You may know me as a creator of increaser.org and booksconcepts.com.`,
    author: `Rodion Chachura`,
    siteUrl: `https://geekrodion.com`
  },
  plugins: [
    'gatsby-plugin-root-import',
    `gatsby-plugin-remove-trailing-slashes`,
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
      resolve: `gatsby-plugin-google-fonts-with-attributes`,
      options: {
        fonts: [
          `nunito\:400,400i,600`,
        ],
        display: 'swap',
        attributes: {
          rel: "stylesheet preload prefetch",
        }
      }
    },
    {
      resolve: `gatsby-plugin-amplitude-analytics`,
      options: {
        apiKey: "afe86075776de93239aa05c74e64baed",
        amplitudeConfig: {
          includeReferrer: true
        },
        environments: ["production"],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-code-titles',
            options: { },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              showCaptions: true
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
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              prompt: {
                user: "geekrodion",
                host: "",
                // global: true,
              },
            }
          },
          `gatsby-remark-copy-linked-files`
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
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'geekrodion',
        protocol: 'https',
        hostname: 'geekrodion.com'
      },
    },
  ]
}
