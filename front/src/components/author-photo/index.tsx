import React from 'react'
import { graphql, useStaticQuery } from "gatsby"

import Text from '../text'
import { Container } from './styles'

const query = graphql`
  query {
    allFile(
      sort: { fields: name, order: DESC }
      filter: { relativeDirectory: { eq: "author-photo-gallery" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

const AuthorPhoto = () => {
  const { allFile: { edges }} = useStaticQuery(query)

  return (
    <Container>
      <Text>
        {JSON.stringify(edges.map(e => e.node))}
      </Text>
    </Container>
  )
}

export default AuthorPhoto
