import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/blog/post'

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post } = data

  return (
    <Layout location={location}>
      <SEO/>
      <Post post={post}/>
    </Layout>
  )
}


export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

export default BlogPost