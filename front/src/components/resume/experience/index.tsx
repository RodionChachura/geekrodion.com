import React from 'react'

import Text, { TextColor } from '../../text'
import { Container, Header } from './styles'

interface Props {
  company: string,
  position: string,
  website: string,
  remote?: boolean,
  start: Date,
  end?: Date,
  responsibilities: string[],
}

const Experience = ({ company, position, website, remote, start, end, responsibilities }: Props) => {
  const formatDate = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format
  return (
    <Container>
      <Header>
        <Text>{position}</Text>
        <Text openInNewTab underline to={website} color={TextColor.SECONDARY}>{company}</Text>
      </Header>
      <Header>
        {remote && <Text>Remote</Text>}
        <Text color={TextColor.SECONDARY}>{formatDate(start)} - {end ? formatDate(end) : 'Present'}</Text>
      </Header>
      {responsibilities.map(text => (
        <Text color={TextColor.SECONDARY}>- {text}</Text>
      ))}
    </Container>
  )
}

export default Experience