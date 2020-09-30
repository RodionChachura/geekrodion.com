import React from 'react'

import { Container } from './styles'
import Category from './category'

interface Props {
  categories: string[],
  pathname: string
}

const Categories = ({ categories, pathname }: Props) => {
  return (
    <Container>
      {categories.map(category => (
        <Category category={category} selected={pathname.includes(category)} />
      ))}
    </Container>
  )
}

export default Categories