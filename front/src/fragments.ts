import { graphql } from 'gatsby'

export const postForListFields = graphql`
  fragment PostForListFields on MarkdownRemarkConnection {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          date
          title
          keywords
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export const seriesPartForListFields = graphql`
  fragment SeriesPartForListFields on MarkdownRemarkConnection {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
`