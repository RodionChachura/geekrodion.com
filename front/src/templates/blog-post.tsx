import React from 'react'
import { graphql } from 'gatsby'
import { withTheme } from 'styled-components'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/blog/post'

const BlogPost = ({ data, theme, pageContext: { slug, isSeriesRoot } }) => {
  const { markdownRemark: post, seriesParts, seriesRoot } = data
  return (
    <Layout customBackground={theme.blog.color.background}>
      <SEO
        image={post.frontmatter.featuredImage.childImageSharp.resize}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <Post
        slug={slug}
        post={post}
        isSeriesRoot={isSeriesRoot}
        seriesParts={seriesParts}
        seriesRoot={seriesRoot}
      />
    </Layout>
  )
}


export const pageQuery = graphql`
  query BlogPostByPath($slug: String!, $isSeries: Boolean!, $isSeriesPart: Boolean!, $seriesPartsSlugRegex: String, $seriesRootSlug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        featuredImage {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
        title
        resources
        title
        description
      }
    }
    seriesParts: allMarkdownRemark(
      filter: {
        fields: { slug: { regex: $seriesPartsSlugRegex } }
      }
    ) @include(if:$isSeries) {
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
    seriesRoot: markdownRemark(fields: { slug: { eq: $seriesRootSlug } }) @include(if:$isSeriesPart) {
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