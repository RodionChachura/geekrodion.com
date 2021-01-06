import React from 'react'

import Text, { TextColor } from '../../text'
import { Container, Header } from './styles'

interface Props {
  name: string,
  website: string,
  children?: React.ReactNode
}

const Project = ({ website, name, children }: Props) => {
  return (
    <Container>
      <Header>
        <Text openInNewTab underline to={website} color={TextColor.SECONDARY}>{name}</Text>
      </Header>
      {children}
    </Container>
  )
}

export default Project