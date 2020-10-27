const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (
    node.internal.type === `MarkdownRemark` &&
    node.fileAbsolutePath.includes("blog")
  ) {
    const slug = createFilePath({ node, getNode, basePath: `src/blog`, trailingSlash: false })
    createNodeField({
      node,
      name: `slug`,
      value: `/blog${slug}`
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.tsx`)
  const categoryTemplate = path.resolve(`src/templates/category.tsx`)

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: {
          fields: { slug: { regex: "/^\/[^/]+\/[^/]+$/" }}
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      seriesPartsRemark: allMarkdownRemark(
        filter: {
          fields: { slug: { regex: "/\/.+\/.+\/.+/" }}
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      categoriesGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query`)
    return
  }

  const posts = result.data.postsRemark.edges
  const seriesParts = result.data.seriesPartsRemark.edges

  const getSeriesPartsSlugRegex = slug => `/${slug.replace(/\//g, '\\/')}\/.+/`

  posts.forEach(({ node }) => {
    const { slug } = node.fields
    const isSeriesRoot = seriesParts.some(e => e.node.fields.slug.includes(slug))

    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        isSeries: isSeriesRoot,
        isSeriesRoot,
        isSeriesPart: false,
        seriesPartsSlugRegex: getSeriesPartsSlugRegex(slug),
        slug
      }
    })
  })

  seriesParts.forEach(({ node }) => {
    const { slug } = node.fields

    const seriesRootSlug = slug.substring(0, slug.lastIndexOf('/'))
    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        slug,
        isSeries: true,
        isSeriesPart: true,
        seriesPartsSlugRegex: getSeriesPartsSlugRegex(seriesRootSlug),
        seriesRootSlug
      }
    })
  })

  const categories = result.data.categoriesGroup.group
  categories.forEach(({ fieldValue }) => {
    createPage({
      path: `/blog/${fieldValue}`,
      component: categoryTemplate,
      context: {
        category: fieldValue
      }
    })
  })
}
