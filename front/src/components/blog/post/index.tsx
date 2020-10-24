import React from 'react'

import { Container, Content, HeadlineContainer } from './styles'
import Text from '../../text'
import Resources from './resources'

const Post = ({ post }) => {
  const { resources } = post.frontmatter
  return (
    <Container>
      <HeadlineContainer>
        <Text size={40} tag={'h1'} bold>{post.frontmatter.title}</Text>
      </HeadlineContainer>
      {resources && <Resources resources={resources} />}
      <Content dangerouslySetInnerHTML={{ __html: post.html }}/>
    </Container>
  )
}

export default Post