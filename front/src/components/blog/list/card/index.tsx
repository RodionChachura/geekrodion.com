import React from 'react'
import Img, { FluidObject } from "gatsby-image"

import { Container, Content, KeywordsContainer, Keyword } from './styles'
import Text, { TextColor } from '../../../text'

interface Props {
  date: string,
  title: string,
  image: FluidObject,
  keywords: string[]
}

const Card = ({ date, title, image, keywords }: Props) => {
  <Container>
    <Img fluid={image}/>
    <Content>
      <Text>{title}</Text>
      <Text color={TextColor.SECONDARY}>{date}</Text>
      <KeywordsContainer>
        {keywords.map(keyword => (
          <Keyword>
            <Text>{keyword}</Text>
          </Keyword>
        ))}
      </KeywordsContainer>
    </Content>
  </Container>
}

export default Card