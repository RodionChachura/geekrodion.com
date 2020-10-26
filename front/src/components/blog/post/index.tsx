import React from 'react'

import { Container, Content, HeadlineContainer } from './styles'
import Text from '../../text'
import Resources from './resources'

interface Props {
  post: any,
  seriesParts: any,
  seriesIndex: any
  slug: string
}

const Post = ({ post, seriesParts, slug, seriesIndex }: Props) => {
  const { resources } = post.frontmatter
  console.log(slug, seriesParts, seriesIndex)
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