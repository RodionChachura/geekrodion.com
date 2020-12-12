import React from 'react'

import Text, { TextColor } from '../../text'
import { Container, Header } from './styles'

interface Props {
  company: string,
  position: string,
  website: string,
  remote?: boolean
}

const Experience = ({ company, position, website, remote }: Props) => {
  return (
    <Container>
      <Header>
        <Text>{position}</Text>
        <Text openInNewTab underline to={website} color={TextColor.SECONDARY}>{company}</Text>
      </Header>
      <Header>
        {remote && <Text>(remote)</Text>}
      </Header>
    </Container>
  )
}

export default Experience