import React from 'react'

import About from './about'
import Photo from './photo'
import Social from './about/social'
import { Container} from './styles'

const Author = () => {
  return (
    <Container>
      <About/>
      <Photo/>
    </Container>
  )
}

export default Author