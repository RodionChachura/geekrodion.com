import React from 'react'

import Text, { TextColor } from '../../text'

interface Props {
  to: string,
  text: string
}

const Contact = ({ to, text }: Props) => {
  return (
    <Text openInNewTab underline to={to} color={TextColor.SECONDARY}>{text}</Text>
  )
}

export default Contact