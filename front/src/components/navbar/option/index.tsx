import React from 'react'

import { Container } from './styles'
import Text from '../../text'

const Option = ({ text, onClick }) => {
  return (
    <Container>
      <Text onClick={onClick} bold size={16}>
        {text}
      </Text>
    </Container>
  )
}

export default Option