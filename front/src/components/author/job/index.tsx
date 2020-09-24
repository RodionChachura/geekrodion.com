import React from 'react'

import { Container } from './styles'
import Text, { TextColor } from '../../text'

const Job = () => {
  return (
    <Container>
      <Text bold color={TextColor.REVERSED}>
        Hire Me
      </Text>
    </Container>
  )
}

export default Job