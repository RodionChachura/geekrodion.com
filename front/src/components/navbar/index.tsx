import React from 'react'
import { useMediaQuery } from 'beautiful-react-hooks'

import { NavbarPlaceholder, NavbarContainer } from './styles'
import Text from '../text'
import { MOBILE_WIDTH } from '../author/styles'

export const Navbar = () => {
  const hideNavbar = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`)
  if (hideNavbar) {
    return null
  }

  return (
    <>
      <NavbarContainer>
        <Text bold size={30}>
          GEEKRODION
        </Text>
      </NavbarContainer>
      <NavbarPlaceholder/>
    </>
  )
}

export default Navbar