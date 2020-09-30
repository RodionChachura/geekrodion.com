import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Text from '../components/text'
import Categories from '../components/blog/categories'

const Category = ({ pageContext, data, location: { pathname } }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.postsRemark
  const categories = data.categoriesGroup.group.map(g => g.fieldValue)
  
  return (
    <Layout location={location}>
      <SEO/>
      <Categories
        categories={categories}
        pathname={pathname}
      />
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
    postsRemark: allMarkdownRemark(
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
    categoriesGroup: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`

export default Category