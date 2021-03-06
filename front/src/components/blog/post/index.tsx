import React from 'react'

import { Container, Content, HeadlineContainer } from './styles'
import Text from '../../text'
import Resources from './resources'
import SeriesPart from './series/part'
import SeriesRoot from './series/root'
import { getFlatObject } from '../../utils/generic'
import { Promotion } from 'src/components/promotion'
import BigPromotion from './promotion'
import { AfterDelay } from 'src/components/common/after-delay'

interface Props {
  post: any,
  seriesParts: any,
  seriesRoot: any
  slug: string,
  isSeriesRoot: boolean
}

const Post = ({ post, seriesParts, slug, seriesRoot, isSeriesRoot }: Props) => {
  const { resources } = post.frontmatter

  const renderContent = () => {
    return (
      <>
        {resources && <Resources resources={resources} />}
        <Content dangerouslySetInnerHTML={{ __html: post.html }}/>
      </>
    )
  }

  const renderPost = () => {
    if (!seriesParts) {
      return renderContent()
    }

    const parts = seriesParts.edges
      .map(e => e.node)
      .map(getFlatObject)

    if (isSeriesRoot) {
      return (
        <SeriesRoot
          parts={parts}
        >
          {renderContent()}
        </SeriesRoot>
      )
    }

    const { slug: rootSlug, title: seriesTitle } = getFlatObject(seriesRoot)
    return (
      <SeriesPart
        parts={parts}
        rootSlug={rootSlug}
        seriesTitle={seriesTitle}
        slug={slug}
      >
        {renderContent()}
      </SeriesPart>
    )
  }

  return (
    <>
      <Container>
        <HeadlineContainer>
          <Text size={40} tag={'h1'} bold>{post.frontmatter.title}</Text>
        </HeadlineContainer>
        {renderPost()}
        <BigPromotion/>
      </Container>
      <AfterDelay>
        <Promotion/>
      </AfterDelay>
    </>
  )
}

export default Post
