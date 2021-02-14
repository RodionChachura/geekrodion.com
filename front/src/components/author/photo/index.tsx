import React, { useState, useRef } from 'react'
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { useInterval } from 'beautiful-react-hooks'
import _ from "lodash"

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
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

const IMAGE_DURATION = 20000

const AuthorPhoto = () => {
  const { allFile: { edges }} = useStaticQuery(query)
  const photos = edges.map(e => e.node.childImageSharp.fluid)

  const { current: shuffledPhotos } = useRef(_.shuffle(photos))
  const [photoIndex, setPhotoIndex] = useState(0)

  useInterval(() => {
    const newPhotoIndex = photoIndex + 1
    setPhotoIndex(newPhotoIndex)
  }, IMAGE_DURATION);

  return (
    <Container>
      <Img fluid={shuffledPhotos[photoIndex % shuffledPhotos.length]}/>
    </Container>
  )
}

export default AuthorPhoto
