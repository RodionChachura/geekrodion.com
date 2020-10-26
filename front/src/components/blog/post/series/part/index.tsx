import React from 'react'

import Text from '../../../../text'

interface Props {
  seriesParts: any,
  seriesIndex: any
  slug: string,
  children: any
}

const SeriesPart = ({ seriesParts, seriesIndex, slug, children }: Props) => {
  return (
    <>
      <Text>Part 4 of the series "Taka Taka"</Text>
      {children}
      <Text>Next Part</Text>
    </>
  )
}

export default SeriesPart