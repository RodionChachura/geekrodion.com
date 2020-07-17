import React from 'react'
import { useMediaQuery } from 'beautiful-react-hooks'

import About from './about'
import Photo from './photo'
import Social from './social'
import { AuthorContainer, MOBILE_WIDTH} from './styles'

const Author = () => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`)

  return (
    <AuthorContainer>
      <About/>
      <Photo/>
      {isMobile && <Social/>}
    </AuthorContainer>
  )
}

export default Author