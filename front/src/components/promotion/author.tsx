import React from 'react'
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  z-index: 6;
  left: -40px;
  bottom: 240px;
  transform: rotate(30deg);
`

interface Props {
  
}

export const query = graphql`
  query {
    helloImg: file(relativePath: { eq: "author-emoji/hello.png" }) {
      childImageSharp {
        fixed(width: 160, height: 160) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export const Author = ({}: Props) => {
  const { helloImg } = useStaticQuery(query)
  return (
    <Container>
      <Img fixed={helloImg.childImageSharp.fixed} />
    </Container>
  )
}
