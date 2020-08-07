import styled, { css } from 'styled-components'

import { TextColor, SUPPORTED_TAGS } from './constants'

export const getTextColor = (theme, textColor) => {
  return {
    [TextColor.DEFAULT]: theme.color.text,
    [TextColor.SECONDARY]: theme.color.secondaryText,
    [TextColor.PRIMARY]: theme.color.primary
  }[textColor]
}

export const getTextHoverColor = (theme: any, textColor: string) => {
  return (
    {
      [TextColor.DEFAULT]: theme.color.primary,
      [TextColor.SECONDARY]: theme.color.text,
    }[textColor] || getTextColor(theme, textColor)
  )
}

export const style = css`
  font-size: ${p => p.size}px;
  transition: ${p => p.theme.transition.default};
  color: ${p => p.customColor || getTextColor(p.theme, p.color)};
  font-weight: normal;
  line-height: 1.5em;
  ${p =>
    p.centered &&
    css`
      text-align: center;
    `}
  ${p =>
    p.italic &&
    css`
      font-style: italic;
    `}
  ${p =>
    p.bold &&
    css`
      font-weight: bold;
    `}
  ${p =>
    p.clickable &&
    css`
      cursor: pointer;
      :hover {
        color: ${p => getTextHoverColor(p.theme, p.color)};
      }
    `}
  ${p =>
    p.underline &&
    css`
      text-decoration: underline;
    `}
`

export const TextComponent = SUPPORTED_TAGS.reduce(
  (acc, tag) => ({
    ...acc,
    [tag]: styled[tag]`
      ${style}
    `
  }),
  {}
)
