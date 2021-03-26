import React from 'react'

import Text, { TextColor } from '../../text'
import { InlineText, SectionPartContainer } from '../styles'

interface Props {
  company: string,
  position: string,
  website: string,
  remote?: boolean,
  start: Date,
  end?: Date,
  children?: React.ReactNode
}

const Experience = ({ company, position, website, remote, start, end, children }: Props) => {
  const formatDate = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format
  return (
    <SectionPartContainer>
      <div>
        <InlineText>
          <Text size={22}>{position}</Text>
          <Text size={22} openInNewTab underline to={website} color={TextColor.SECONDARY}>{company}</Text>
        </InlineText>
        <InlineText>
          <Text color={TextColor.SECONDARY}>{formatDate(start)} - {end ? formatDate(end) : 'Present'}</Text>
          {remote && <Text>Remote</Text>}
        </InlineText>
      </div>
      {children}
    </SectionPartContainer>
  )
}

export default Experience
