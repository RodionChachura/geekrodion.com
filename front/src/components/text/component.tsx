import React from 'react'

import { TextColor, SUPPORTED_TAGS } from './constants'
import { StyledLink, TextComponent } from './styles'

const getTextComponent = (tag: string) => {
  return TextComponent[SUPPORTED_TAGS.includes(tag) ? tag : 'p']
}

type Props = {
  tag?: string,
  children: any,
  size?: number,
  color?: TextColor,
  customColor?: string,
  underline?: boolean
  bold?: boolean,
  onClick?: () => void,
  to?: string,
  openInNewTab?: boolean,
  style?: Object,
}

const DEFAULT_PROPS = {
  tag: 'p',
  size: 18,
  color: TextColor.DEFAULT,
}

const Text = ({ children, ...rest }: Props) => {
  const props = {
    ...DEFAULT_PROPS,
    ...rest,
    clickable: !!(rest.onClick || rest.to)
  }

  let Component
  if (rest.to) {
    Component = rest.openInNewTab ? getTextComponent('a') : StyledLink
  } else {
    Component = getTextComponent(props.tag)
  } 


  let definedProps = Object.keys(props).reduce((acc, key) => {
    const value = props[key]
    if (value === undefined || value === false) {
      return acc
    }

    return {
      ...acc,
      [key]: value === true ? 'true' : value
    }
  }, {})

  if (rest.to && rest.openInNewTab) {
    definedProps = {
      ...definedProps,
      href: rest.to,
      target: "_blank",
      rel: "noopener noreferrer"
    }
  }

  return (
    <Component {...definedProps}>
      {children}
    </Component>
  )
}

export default Text
