import React from 'react'
import { DateTime } from 'luxon'
import Img, { FluidObject } from "gatsby-image"
import { faYoutube, faMedium, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Series as SeriesType, SourceType } from '../../../constants/content'
import { Container, Content, SourcesContainer, Source, IconWrapper } from './styles'
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

const SOURCE_TEXT = {
  [SourceType.MEDIUM]: 'read',
  [SourceType.YOUTUBE]: 'watch',
  [SourceType.UDEMY]: 'watch',
  [SourceType.GITHUB]: 'explore'
}

const SOURCE_ICON = {
  [SourceType.MEDIUM]: faMedium,
  [SourceType.YOUTUBE]: faYoutube,
  [SourceType.UDEMY]: faPlayCircle,
  [SourceType.GITHUB]: faGithub
}
const Series = ({ finishDate, name, image, sources }: Props) => {
  return (
    <Container>
      <Img fluid={image}/>
      <Content>
        <Text>{name}</Text>
        <Text color={TextColor.SECONDARY}>{getTimeText(finishDate)}</Text>
        <SourcesContainer>
          {sources.map(({ link, type }) => (
            <Source key={type} href={link} target="_blank" rel="noopener noreferrer">
              <Text color={TextColor.PRIMARY}>
                <IconWrapper>
                  <FontAwesomeIcon icon={SOURCE_ICON[type]} />
                </IconWrapper>
                {SOURCE_TEXT[type]}
              </Text>
            </Source>
          ))}
        </SourcesContainer>
      </Content>
    </Container>
  )
}

export default Series