import React from 'react'
import Img, { FluidObject } from "gatsby-image"

import { Container, Content, KeywordsContainer, Keyword, PartsBadgeContainer } from './styles'
import Text, { TextColor } from '../../../text'

interface Props {
  date: string,
  title: string,
  image: FluidObject,
  slug: string,
  keywords: string[],
  parts?: number
}

const Card = ({ date, title, keywords, image, slug, parts }: Props) => {
  return (
    <Container to={slug}>
      <div>
        {parts && (
          <PartsBadgeContainer>
            <Text bold color={TextColor.REVERSED}>{parts}-PART SERIES</Text>
          </PartsBadgeContainer>
        )}
        <Img fluid={image}/>
      </div>
      <Content>
        <Text>{title}</Text>
        <Text color={TextColor.SECONDARY}>{date}</Text>
        <KeywordsContainer>
          {keywords.map(keyword => (
            <Keyword key={keyword}>
              <Text color={TextColor.SECONDARY} size={14}>{keyword}</Text>
            </Keyword>
          ))}
        </KeywordsContainer>
      </Content>
    </Container>
  )
}

export default Card