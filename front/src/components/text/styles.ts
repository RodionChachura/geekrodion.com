import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import { TextColor, SUPPORTED_TAGS } from './constants'

export const getTextColor = (textColor: string) => {
  return {
    [TextColor.DEFAULT]: 'var(--text-color)',
    [TextColor.SECONDARY]: 'var(--text-light-color)',
    [TextColor.PRIMARY]: 'var(--primary-color)',
    [TextColor.REVERSED]: 'var(--background-color)',
  }[textColor]
}

export const getTextHoverColor = (textColor: string) => {
  return (
    {
      [TextColor.DEFAULT]: 'var(--primary-color)',
      [TextColor.SECONDARY]:'var(--text-color)',
      [TextColor.PRIMARY]: 'var(--primary-color)',
      [TextColor.REVERSED]: 'var(--background-color)',
    }[textColor] || getTextColor(textColor)
  )
}

export const style = css`
  text-decoration: none;
  font-size: ${p => p.size}px;
  transition: var(--default-transition);
  color: ${p => p.customColor || getTextColor(p.color)};
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
        color: ${p => getTextHoverColor(p.color)};
        ${p =>
          p.underline &&
          css`
            border-color: ${p => getTextHoverColor(p.color)};
          `}
      }
    `}
  ${p =>
    p.underline &&
    css`
      border-bottom: 2px solid ${p => getTextHoverColor(p.color)};
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
