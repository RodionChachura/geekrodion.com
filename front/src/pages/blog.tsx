import React from "react"
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Categories from '../components/blog/categories'
import CardsList from '../components/blog/list'

const Blog = ({ data }) => {
  return (
    <Layout>
      <SEO
        title="Geekrodion Writings on Programming and Product"
        description="Here I write about programming technologies and my side-projects"
      />
      <Categories />
      <CardsList {...data} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    postsRemark: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { slug: { regex: "/^\/[^/]+\/[^/]+$/" }}
      }
    ) {
      ...PostForListFields
    },
    seriesPartsRemark: allMarkdownRemark(
      filter: {
        fields: { slug: { regex: "/\/.+\/.+\/.+/" }}
      }
    ) {
      ...SeriesPartForListFields
    }
  }
`

export default Blog
