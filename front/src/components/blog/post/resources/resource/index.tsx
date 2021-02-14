import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Container } from './styles'
import Text, { TextColor } from '../../../../text'

interface Props {
  color: string,
  to: string,
  icon: any,
  text: string
}

export const Resource = ({ color, to, icon, text }: Props) => {
  return (
    <Container color={color} href={to} target="_blank" rel="noopener noreferrer">
      <Text bold size={16} color={TextColor.REVERSED}>
        <FontAwesomeIcon style={{ marginRight: 10}} icon={icon} />
        {text}
      </Text>
    </Container>
  )
}

export default Resource
