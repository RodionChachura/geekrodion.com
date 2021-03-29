import React from 'react'
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'

const Container = styled(animated.div)`
  position: fixed;
  z-index: 6;
  /* bottom: 240px; */
  bottom: 230px;
  transform: rotate(30deg);
`

interface Props {
  mood?: 'hello' | 'sad' | 'smile'
  onAnimationFinish: () => void
}

export const query = graphql`
  query {
    hello: file(relativePath: { eq: "author-emoji/regular.png" }) {
      childImageSharp {
        fixed(width: 160, height: 160) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    sad: file(relativePath: { eq: "author-emoji/cry.png" }) {
      childImageSharp {
        fixed(width: 170, height: 170) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    smile: file(relativePath: { eq: "author-emoji/smile.png" }) {
      childImageSharp {
        fixed(width: 170, height: 170) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export const Author = ({ onAnimationFinish, mood = 'hello' }: Props) => {
  const imgs = useStaticQuery(query)
  const img = imgs[mood]
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
      <Img fixed={img.childImageSharp.fixed} />
    </Container>
  )
}
