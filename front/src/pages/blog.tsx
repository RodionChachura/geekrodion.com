import React from "react"
import { graphql, useStaticQuery } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Categories from '../components/blog/categories'
import CardsList from '../components/blog/list'

const query = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...PostForListFields
    }
  }
`

const BlogPage = () => {
  const { allMarkdownRemark: { edges } } = useStaticQuery(query)

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
