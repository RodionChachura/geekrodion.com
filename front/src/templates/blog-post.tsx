import React from 'react'
import { graphql } from 'gatsby'
import { withTheme } from 'styled-components'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/blog/post'

const BlogPost = ({ data, theme, pageContext: { slug } }) => {
  const { markdownRemark: post, seriesParts, seriesIndex } = data

  return (
    <Layout customBackground={theme.blog.color.background}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <Post
        slug={slug}
        post={post}
        seriesParts={seriesParts}
        seriesIndex={seriesIndex}
      />
    </Layout>
  )
}


export const pageQuery = graphql`
  query BlogPostByPath($slug: String!, $isSeriesPart: Boolean!, $otherPartsSlugsRegex: String, $seriesIndexSlug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        resources
        title
        description
      }
    }
    seriesParts: allMarkdownRemark(
      filter: {
        fields: { slug: { regex: $otherPartsSlugsRegex } }
      }
    ) @include(if:$isSeriesPart) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            shortTitle
            partNumber
          }
        }
      }
    }
    seriesIndex: markdownRemark(fields: { slug: { eq: $seriesIndexSlug } }) @include(if:$isSeriesPart) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

export default withTheme(BlogPost)