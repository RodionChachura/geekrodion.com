import React from 'react'

import Text from '../../text'
import { Container, TextWrapper } from './styles'

const AuthorAbout = () => {
  return (
    <Container>
      <TextWrapper>
        <Text>Hi, I’m Rodion 👋</Text>
      </TextWrapper>
      <Text bold size={34}>I develop software, make content, and create indie projects</Text>
      <TextWrapper>
        <Text>I strive to stay open-minded, so my interests change over time. Right now, I’m fascinated with the idea of bootstrapped SAAS, how to balance productivity with creativity, and being comfortable with myself.</Text>
      </TextWrapper>
    </Container>
  )
}

export default AuthorAbout