import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Categories from '../components/blog/categories'
import CardsList from '../components/blog/list'

import categories from '../blog/categories.json'

const Category = ({ data, location: { pathname }, pageContext: { category } }) => {
  const { edges } = data.postsRemark
  const { title, description } = categories[category]
  return (
    <Layout>
      <SEO
        title={title}
        description={description}
      />
      <Categories
        pathname={pathname}
      />
      <CardsList
        edges={edges}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($category: String) {
    postsRemark: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            title
            keywords
            parts
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Category