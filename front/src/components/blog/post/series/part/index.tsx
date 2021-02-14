import React from "react"

import Text, { TextColor } from "../../../../text"
import { SeriesPartInfo } from "../types"
import { PartNumberContainer, NextPartContainer } from "./styles"

interface Props {
  parts: SeriesPartInfo[]
  rootSlug: string
  seriesTitle: string
  slug: string
  children: any
}

const SeriesPart = ({ parts, slug, children, rootSlug, seriesTitle }: Props) => {
  const { partNumber } = parts.find(p => p.slug === slug)

  const renderNextPart = () => {
    if (partNumber === parts.length) {
      return null
    }

    const nextPartNumber = partNumber + 1
    const { slug, shortTitle } = parts.find(
      p => p.partNumber === nextPartNumber
    )

    return (
      <Text to={slug} underline color={TextColor.SECONDARY}>
        Part {nextPartNumber}: "{shortTitle}"
      </Text>
    )
  }

  return (
    <>
      <PartNumberContainer>
        <Text color={TextColor.SECONDARY}>
          Part {partNumber} of the series{" "}
          <Text color={TextColor.SECONDARY} underline to={rootSlug}>
            "{seriesTitle}"
          </Text>
        </Text>
      </PartNumberContainer>
      {children}
      <NextPartContainer>{renderNextPart()}</NextPartContainer>
    </>
  )
}

export default SeriesPart
