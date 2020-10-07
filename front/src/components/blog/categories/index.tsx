import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Container } from './styles'
import Category from './category'

interface Props {
  pathname: string
}

const query = graphql`
  query Categories {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`

const Categories = ({ pathname }: Props) => {
  const data = useStaticQuery(query)
  const categories = data.allMarkdownRemark.group.map(g => g.fieldValue)

  return (
    <Container>
      {categories.map(category => (
        <Category key={category} category={category} selected={pathname.includes(category)} />
      ))}
    </Container>
  )
}

export default Categories