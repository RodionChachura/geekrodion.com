import React from 'react'
import { useMediaQuery } from 'beautiful-react-hooks'

import About from './about'
import Photo from './photo'
import Social from './social'
import { Container, MOBILE_WIDTH} from './styles'

const Author = () => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`)

  return (
    <Container>
      <About/>
      <Photo/>
      {isMobile && <Social/>}
    </Container>
  )
}

export default Author