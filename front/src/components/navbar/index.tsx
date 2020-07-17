import React from 'react'

import { Placeholder, Container } from './styles'
import Text from '../text'

export const Navbar = () => {
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