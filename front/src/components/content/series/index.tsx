import React from 'react'
import { DateTime } from 'luxon'
import Img, { FluidObject } from "gatsby-image"

import { Series as SeriesType } from '../../../constants/content'
import { Container, Content } from './styles'
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

type Props = SeriesType & {
  image: FluidObject;
}

const Series = ({ finishDate, name, image, sources }: Props) => {
  return (
    <Container>
      <Img fluid={image}/>
      <Content>
        <Text>{name}</Text>
        <Text color={TextColor.SECONDARY}>{getTimeText(finishDate)}</Text>
      </Content>
    </Container>
  )
}

export default Series