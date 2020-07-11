import React from 'react'

import { Container, Logo, Navigation } from './styles'
import Text from '../text'

export const Navbar = () => {
  return (
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
  )
}

export default Navbar