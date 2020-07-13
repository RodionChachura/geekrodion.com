import React from 'react'
import { useMediaQuery } from 'beautiful-react-hooks'

import { Placeholder, Container } from './styles'
import Text from '../text'
import { MOBILE_WIDTH } from '../author/styles'

export const Navbar = () => {
  const hideNavbar = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`)
  if (hideNavbar) {
    return null
  }

  return (
    <>
      <Container>
        <Text bold size={30}>
          GEEKRODION
        </Text>
      </Container>
      <Placeholder/>
    </>
  )
}

export default Navbar