import React from 'react'

import { Container } from './styles'
import { SERIES } from '../../constants/content'
import Series from './series'

const Content = () => {
  return (
    <Container id={'series'}>
      {SERIES.map(series => (
        <Series/>
      ))}
    </Container>
  )
}

export default Content