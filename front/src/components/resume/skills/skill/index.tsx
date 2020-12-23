import React from 'react'

import Text, { TextColor } from '../../../text'
import { Container } from './styles'

export enum Significance {
  Primary,
  Secondary
}

interface Props {
  text: string,
  significance: Significance
}

const Skill = ({ text, significance }: Props) => {
  return (
    <Container primary={significance === Significance.Primary}>
      <Text color={TextColor.BLOG_REVERSED}>{text}</Text>
    </Container>
  )
}

export default Skill