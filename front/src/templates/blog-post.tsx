import React from 'react'
import { graphql } from 'gatsby'
import { withTheme } from 'styled-components'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/blog/post'

const BlogPost = ({ data, theme }) => {
  const { markdownRemark: post } = data

  return (
    <Layout customBackground={theme.blog.color.background}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
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
        headline
        title
        description
      }
    }
  }
`

export default withTheme(BlogPost)