import React from 'react'

import { Container, Content, HeadlineContainer } from './styles'
import Text from '../../text'
import Resources from './resources'
import SeriesPart from './series/part'

interface Props {
  post: any,
  seriesParts: any,
  seriesIndex: any
  slug: string
}

const Post = ({ post, seriesParts, slug, seriesIndex }: Props) => {
  const { resources } = post.frontmatter

  const renderContent = () => {
    return (
      <>
        {resources && <Resources resources={resources} />}
        <Content dangerouslySetInnerHTML={{ __html: post.html }}/>
      </>
    )
  }

  return (
    <Container>
      <HeadlineContainer>
        <Text size={40} tag={'h1'} bold>{post.frontmatter.title}</Text>
      </HeadlineContainer>
      {seriesIndex ? (
        <SeriesPart
          seriesParts={seriesParts}
          seriesIndex={seriesIndex}
          slug={slug}
        >
          {renderContent()}
        </SeriesPart>
      ) : renderContent()}
    </Container>
  )
}

export default Post