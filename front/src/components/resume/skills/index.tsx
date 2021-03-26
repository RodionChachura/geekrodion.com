import React from 'react'

import { Container } from './styles'
import Text, { TextColor } from '../../text'

interface Props {
  primary?: string[],
  secondary?: string[]
}

const Skills = ({ primary = [], secondary = [] }: Props) => {
  return (
    <Container>
      <Text size={16}>Skills: <Text color={TextColor.SECONDARY} size={16} tag="span">{[...primary, ...secondary].join(', ')}</Text></Text>
    </Container>
  )
}

export default Skills
