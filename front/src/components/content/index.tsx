import React from 'react'
import { graphql, useStaticQuery } from "gatsby"

import { Container, SeriesContainer } from './styles'
import { SERIES } from '../../constants/content'
import Series from './series'

const query = graphql`
  query {
    allFile(
      sort: { fields: name, order: DESC }
      filter: { relativeDirectory: { eq: "series" } }
    ) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

const Content = () => {
  const { allFile: { edges }} = useStaticQuery(query)
  const nodes = edges.map(e => e.node)
  const readySeries = SERIES.map(s => ({
    ...s,
    image: nodes.find(n => n.name === s.id).childImageSharp.fluid
  }))

  return (
    <Container id={'series'}>
      <SeriesContainer>
        {readySeries.map((series) => (
          <Series {...series} key={series.name}/>
        ))}
      </SeriesContainer>
    </Container>
  )
}

export default Content