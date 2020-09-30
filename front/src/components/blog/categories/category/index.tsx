import React from 'react'

import { Container } from './styles'
import Text, { TextColor } from '../../../text'

interface Props {
  category: string,
  selected: boolean,
}

const Category = ({ category, selected }: Props) => {
  return (
    <Container selected={selected} to={`/blog/${category}`}>
      <Text size={16} color={selected ? TextColor.REVERSED : TextColor.DEFAULT}>{category.toUpperCase()}</Text>
    </Container>
  )
}

export default Category