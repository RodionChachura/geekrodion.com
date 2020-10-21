import React from "react"
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Categories from '../components/blog/categories'
import CardsList from '../components/blog/list'

const BlogPage = ({ data }) => {
  const { edges } = data.postsRemark

  return (
    <Layout>
      <SEO
        title="Geekrodion Writings on Programming and Product"
        description="Here I write about programming technologies and my side-projects"
      />
      <Categories />
      <CardsList
        edges={edges}
      />
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query BlogPage {
    postsRemark: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
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