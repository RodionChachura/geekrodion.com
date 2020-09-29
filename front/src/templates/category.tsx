import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Text from '../components/text'

const Category = ({ pageContext, data }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  
  return (
    <Layout>
      <SEO/>
      <Text tag='h1'>
        {category} ({totalCount})
      </Text>
      <ul>
        {edges.map(({ node: { frontmatter: { title, path }} }) => {
          return (
            <li key={path}>
              <Link to={`/blog/${category}${path}`}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`

export default Category