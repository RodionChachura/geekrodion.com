import React from 'react'

import { Placeholder, Container, Logo, Navigation } from './styles'
import Text from '../text'

export const Navbar = () => {
  return (
    <>
      <Container>
        <Logo>
          <Text>
            GeekRodion
          </Text>
        </Logo>
        <Navigation>
          <Text>
            Projects
          </Text>
          <Text>
            Courses
          </Text>
        </Navigation>
      </Container>
      <Placeholder/>
    </>
  )
}

export default Navbar