import React from 'react'

import { Container, Content, HeadlineContainer } from './styles'
import Text from '../../text'

const Post = ({ post }) => {
  return (
    <Container>
      <HeadlineContainer>
        <Text size={40} tag={'h1'} bold>{post.frontmatter.headline}</Text>
      </HeadlineContainer>
      <Content dangerouslySetInnerHTML={{ __html: post.html }}/>
    </Container>
  )
}

export default Post