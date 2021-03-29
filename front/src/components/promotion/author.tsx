import React from 'react'
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'

const Container = styled(animated.div)`
  position: fixed;
  z-index: 6;
  bottom: 240px;
  transform: rotate(30deg);
`

interface Props {
  onAnimationFinish: () => void
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

export const Author = ({ onAnimationFinish }: Props) => {
  const { helloImg } = useStaticQuery(query)
  const props = useSpring({
    config: {
      ...config.slow,
      friction: 40,
      clamp: true
    },
    from: {
      left: -200,
      transform: 'rotate(0deg)'
    },
    to: {
      left: - 40,
      transform: 'rotate(30deg)'
    },
    onRest: () => onAnimationFinish()
  })
  return (
    <Container style={props}>
      <Img fixed={helloImg.childImageSharp.fixed} />
    </Container>
  )
}
