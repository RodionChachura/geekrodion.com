import React from 'react'
import Img, { FluidObject } from "gatsby-image"

import { Container, Content, KeywordsContainer, Keyword } from './styles'
import Text, { TextColor } from '../../../text'

interface Props {
  date: string,
  title: string,
  image: FluidObject,
  slug: string,
  keywords: string[]
}

const Card = ({ date, title, keywords, image, slug }: Props) => {
  return (
    <Container to={slug}>
      <Img fluid={image}/>
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