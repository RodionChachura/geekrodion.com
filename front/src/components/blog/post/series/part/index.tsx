import React from 'react'

import Text from '../../../../text'
import { getFlatObject } from '../../../../utils/generic'
import { PartNumberContainer } from './styles'

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
  return (
    <>
      <PartNumberContainer>
        <Text>Part {partNumber} of the series <Text underline to={seriesSlug}>"{seriesTitle}"</Text></Text>
      </PartNumberContainer>
      {children}
      <Text>Next Part</Text>
    </>
  )
}

export default SeriesPart