const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (
    node.internal.type === `MarkdownRemark` &&
    node.fileAbsolutePath.includes("blog")
  ) {
    const slug = createFilePath({ node, getNode, basePath: `src/blog` })
    createNodeField({
      node,
      name: `slug`,
      value: `/blog/${node.frontmatter.category}${slug}`, // Here we are, the path prefix
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
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              category
              path
              category
            }
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
  posts.forEach(({ node }) => {
    const { slug } = node.fields
    createPage({
      path: slug,
      component: blogPostTemplate,
      context: {
        slug
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
