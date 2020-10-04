import { useStaticQuery } from 'gatsby'
import React from 'react'

import { Container } from './styles'

const PostsList = ({ query }) => {
  const { allFile: { edges }} = useStaticQuery(query)
  const nodes = edges.map(e => e.node)

  return (
    <Container>
      {nodes.length}
    </Container>
  )
}

export default PostsList