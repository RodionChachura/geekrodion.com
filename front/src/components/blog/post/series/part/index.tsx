import React from 'react'

import Text, { TextColor } from '../../../../text'
import { getFlatObject } from '../../../../utils/generic'
import { PartNumberContainer, NextPartContainer } from './styles'

interface Props {
  seriesParts: any,
  seriesIndex: any
  slug: string,
  children: any
}

const SeriesPart = ({ seriesParts, seriesIndex, slug, children }: Props) => {
  const parts = seriesParts.edges
    .map(e => e.node)
    .map(getFlatObject)
  
  const { partNumber } = parts.find(p => p.slug === slug)
  const { slug: seriesSlug, title: seriesTitle } = getFlatObject(seriesIndex)

  const renderNextPart = () => {
    if (partNumber === parts.length) {
      return null
    }

    const nextPartNumber = partNumber + 1
    const { slug, shortTitle } = parts.find(p => p.partNumber === nextPartNumber)

    return (
      <Text to={slug} underline color={TextColor.BLOG_SECONDARY}>Part {nextPartNumber}: "{shortTitle}"</Text>
    )
  }

  return (
    <>
      <PartNumberContainer>
        <Text color={TextColor.BLOG_SECONDARY}>Part {partNumber} of the series <Text color={TextColor.BLOG_SECONDARY} underline to={seriesSlug}>"{seriesTitle}"</Text></Text>
      </PartNumberContainer>
      {children}
      <NextPartContainer>
        {renderNextPart()}
      </NextPartContainer>
    </>
  )
}

export default SeriesPart