import React from "react"
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Categories from '../components/blog/categories'
import Text from '../components/text'

const BlogPage = ({ data }) => {
  const { edges, totalCount } = data.postsRemark

  return (
    <Layout>
      <SEO/>
      <Categories
        pathname={location.pathname}
      />
      <Text tag='h1'>
        All Posts ({totalCount})
      </Text>
      <ul>
        {edges.map(({ node: { frontmatter: { title, path, category }} }) => {
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

export default BlogPage

export const pageQuery = graphql`
  query BlogPage {
    postsRemark: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
            category
          }
        }
      }
    }
  }
`