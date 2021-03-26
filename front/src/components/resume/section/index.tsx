import React from 'react'

import Text from '../../text'
import { Container, Content, Background } from './styles'

interface Props {
  name: string,
  children: any,
  color: string
}

const Section = ({ name, children, color }: Props) => {
  return (
    <Container>
      <Background style={{ background: color }}/> 
      <Text style={{ color }} bold>{name}</Text>
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default Section
