import React from 'react'

import Text, { TextColor } from '../../text'
import { Container, Header, Responsibilities } from './styles'

interface Props {
  company: string,
  position: string,
  website: string,
  remote?: boolean,
  start: Date,
  end?: Date,
  responsibilities: string[],
  children?: React.ReactNode
}

const Experience = ({ company, position, website, remote, start, end, responsibilities, children }: Props) => {
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
      <Responsibilities>
        {responsibilities.map(text => (
          <Text key={text} color={TextColor.SECONDARY}>- {text}</Text>
        ))}
      </Responsibilities>
      {children}
    </Container>
  )
}

export default Experience