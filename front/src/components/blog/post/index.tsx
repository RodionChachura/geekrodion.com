import React from 'react'

import { Container, Content } from './styles'

const Post = ({ post }) => {
  return (
    <Container>
      <Content dangerouslySetInnerHTML={{ __html: post.html }}/>
    </Container>
  )
}

export default Post