import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Categories from '../components/blog/categories'
import CardsList from '../components/blog/list'

const Category = ({ data, location: { pathname } }) => {
  const { edges } = data.postsRemark
  
  return (
    <Layout>
      <SEO/>
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
            headline
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
  }
`

export default Category