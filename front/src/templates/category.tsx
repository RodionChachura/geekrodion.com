import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Categories from '../components/blog/categories'
import CardsList from '../components/blog/list'

const Category = ({ data, location: { pathname } }) => {
  const { edges } = data.postsRemark
  const categories = data.categoriesGroup.group.map(g => g.fieldValue)
  
  return (
    <Layout location={location}>
      <SEO/>
      <Categories
        categories={categories}
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
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            title
            path
            keywords
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
    categoriesGroup: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`

export default Category