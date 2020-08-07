import React from 'react'
import { DateTime } from 'luxon'

import { Series as SeriesType } from '../../../constants/content'
import { Container } from './styles'
import Text, { TextColor } from '../../text'

const getTimeText = (finishDate: number): string | null => {
  const { days, months, years } = DateTime.fromMillis(Date.now()).diff(DateTime.fromMillis(finishDate * 1000), [
    'years',
    'months',
    'days'
  ])

  const yearsPart = years > 0 ? `${years} year${years > 0 && 's'}` : ''
  const monthsPart = months > 0 ? `${months} month${months > 0 && 's'}` : ''
  const fixedDays = Math.round(days)
  const daysPart = !yearsPart && fixedDays ? `${fixedDays} day${fixedDays > 0 && 's'}` : ''

  const parts = [yearsPart, monthsPart, daysPart]
  if(!parts.join('')) {
    return null
  }

  return ['finished', ...parts, 'ago'].join(' ')
}

const Series = ({ finishDate, name, sources }: SeriesType) => {

  return (
    <Container>
      <Text>{name}</Text>
      <Text color={TextColor.SECONDARY}>{getTimeText(finishDate)}</Text>
    </Container>
  )
}

export default Series