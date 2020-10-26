import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Categories from '../components/blog/categories'
import CardsList from '../components/blog/list'

import categories from '../blog/categories.json'

const Category = ({ data, location: { pathname }, pageContext: { category } }) => {
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
      <CardsList {...data} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($category: String) {
    postsRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { eq: $category } },
        fields: { slug: { regex: "/^\/[^/]+\/[^/]+$/" }}
      }
    ) {
      ...PostForListFields
    },
    seriesPartsRemark: allMarkdownRemark(
      filter: {
        frontmatter: { category: { eq: $category } }
        fields: { slug: { regex: "/\/.+\/.+\/.+/" }}
      }
    ) {
      ...SeriesPartForListFields
    }
  }
`

export default Category