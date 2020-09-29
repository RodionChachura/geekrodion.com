import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Text from '../components/text'

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <SEO/>
      <Text tag='h1'>
        {post.frontmatter.title}
      </Text>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
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