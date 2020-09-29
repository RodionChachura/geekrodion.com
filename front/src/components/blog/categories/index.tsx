import React from 'react'

import { Container } from './styles'
import Category from './category'

export interface Category {
  slug: string,
  text: string
}

interface Props {
  categories: Category[]
}

const Categories = ({ categories }: Props) => {
  return (
    <Container>
      {categories.map(category => (
        <Category {...category} selected={false} />
      ))}
    </Container>
  )
}

export default Categories