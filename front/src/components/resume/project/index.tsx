import React from 'react'

import Text, { TextColor } from '../../text'
import { SectionPartContainer, InlineText } from '../styles'

interface Props {
  name: string,
  website: string,
  children?: React.ReactNode
}

const Project = ({ website, name, children }: Props) => {
  return (
    <SectionPartContainer>
      <InlineText>
        <Text size={22} openInNewTab underline to={website}>{name}</Text>
      </InlineText>
      {children}
    </SectionPartContainer>
  )
}

export default Project
