import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import { TextColor, SUPPORTED_TAGS } from './constants'

export const getTextColor = (theme, textColor) => {
  return {
    [TextColor.DEFAULT]: theme.color.text,
    [TextColor.SECONDARY]: theme.color.secondaryText,
    [TextColor.PRIMARY]: theme.color.primary,
    [TextColor.REVERSED]: theme.color.background,
    [TextColor.BLOG_REVERSED]: theme.blog.color.background,
    [TextColor.BLOG_SECONDARY]: theme.blog.color.secondaryText
  }[textColor]
}

export const getTextHoverColor = (theme: any, textColor: string) => {
  return (
    {
      [TextColor.DEFAULT]: theme.color.primary,
      [TextColor.SECONDARY]: theme.color.text,
      [TextColor.BLOG_SECONDARY]: theme.color.text
    }[textColor] || getTextColor(theme, textColor)
  )
}

export const style = css`
  text-decoration: none;
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
      font-weight: 600;
    `}
  ${p =>
    p.clickable &&
    css`
      cursor: pointer;
      :hover {
        color: ${p => getTextHoverColor(p.theme, p.color)};
        ${p =>
          p.underline &&
          css`
            border-color: ${p => getTextHoverColor(p.theme, p.color)};
          `}
      }
    `}
  ${p =>
    p.underline &&
    css`
      border-bottom: 2px solid ${p => getTextColor(p.theme, p.color)};
    `}
`

export const StyledLink = styled(Link)`
  ${style};
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
