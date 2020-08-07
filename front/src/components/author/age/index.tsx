import React from 'react'
import { DateTime } from 'luxon'

import { DOB } from '../../../constants/generic'
import Text, { TextColor } from '../../text'
import { Container } from './styles'

export default () => {
  const { years, months, days } = DateTime.fromMillis(Date.now()).diff(DOB, [
    'year',
    'months',
    'days'
  ])
  const age = `${Math.round(years)} years${
    Math.round(months) > 0 ? ` ${Math.round(months)} months` : ''
  }${Math.round(days) > 0 ? ` ${Math.round(days)} days` : ''}`

  return (
    <Container>
      <Text color={TextColor.SECONDARY}>{age}</Text>
    </Container>
  )
}