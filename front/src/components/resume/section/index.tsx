import React from 'react'

import Text from '../../text'
import { Container, Content } from './styles'

interface Props {
  name: string,
  children: any
}

const Section = ({ name, children }: Props) => {
  return (
    <Container>
      <Text bold>{name}</Text>
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default Section