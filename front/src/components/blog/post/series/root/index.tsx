import React from "react"

import Text, { TextColor } from "../../../../text"
import { SeriesPartInfo } from "../types"

interface Props {
  parts: SeriesPartInfo[]
  children: any
}

const SeriesRoot = ({ parts, children }: Props) => {
  return (
    <>
      {children}
      {parts.sort((a, b) => a.partNumber - b.partNumber).map(({ partNumber, slug, shortTitle }) => {
        return (
          <Text key={slug} style={{ marginBottom: 10 }} bold>
            {partNumber}.{" "}
            <Text color={TextColor.SECONDARY} bold to={slug} underline>
              {shortTitle}
            </Text>
          </Text>
        )
      })}
    </>
  )
}

export default SeriesRoot
