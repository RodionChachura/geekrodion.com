import React from 'react'
import { useMediaQuery } from 'beautiful-react-hooks'

import Text, { TextColor } from '../../text'
import { Container, TextWrapper } from './styles'
import Social from '../social'
import { MOBILE_WIDTH } from '../styles'

const AuthorAbout = () => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`)

  return (
    <Container>
      <TextWrapper>
        <Text>Hi, I’m Rodion 👋</Text>
      </TextWrapper>
      <Text bold size={isMobile ? 22 : 34}>I develop software, make content, and create indie projects</Text>
      {!isMobile && (
        <>
          <TextWrapper>
            <Text color={TextColor.SECONDARY}>I strive to stay open-minded, so my interests change over time. Right now, I’m fascinated with the idea of bootstrapped SAAS, how to balance productivity with creativity, and being comfortable with myself.</Text>
          </TextWrapper>
          <Social/>
        </>
      )}
    </Container>
  )
}

export default AuthorAbout