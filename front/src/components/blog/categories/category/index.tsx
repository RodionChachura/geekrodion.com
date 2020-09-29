import React from 'react'

import { Container } from './styles'
import Text, { TextColor } from '../../../text'

interface Props {
  text: string,
  selected: boolean,
  slug: string
}

const Category = ({ text, selected, slug }: Props) => {
  return (
    <Container selected={selected} to={slug}>
      <Text color={selected ? TextColor.REVERSED : TextColor.DEFAULT}>{text.toUpperCase()}</Text>
    </Container>
  )
}

export default Category