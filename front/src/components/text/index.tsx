import React from 'react'

import { TEXT_SIZE, TEXT_COLOR, SUPPORTED_TAGS } from './constants'
import { TextComponent } from './styles'

const getTextComponent = (tag: string) => {
  return TextComponent[SUPPORTED_TAGS.includes(tag) ? tag : 'p']
}

type Props = {
  tag?: string,
  children: any,
  size?: number,
  color?: string,
  customColor?: string,
  underline?: boolean
}

const Text = ({
  children,
  customColor,
  tag = 'p',
  size = TEXT_SIZE.M,
  color = TEXT_COLOR.DEFAULT,
  underline = false,
  ...rest
}: Props) => {
  const Text = getTextComponent(tag)

  return (
    <Text
      underline={underline}
      size={size}
      customColor={customColor}
      color={color}
      {...rest}
    >
      {children}
    </Text>
  )
}

export default Text
