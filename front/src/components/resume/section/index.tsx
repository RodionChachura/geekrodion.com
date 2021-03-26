import React from 'react'

import Text, { TextColor } from '../../text'
import { Container, Content } from './styles'

interface Props {
  name: string,
  children: any,
}

const Section = ({ name, children }: Props) => {
  return (
    <Container>
      <Text size={24} color={TextColor.SECONDARY} bold>{name}</Text>
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default Section
