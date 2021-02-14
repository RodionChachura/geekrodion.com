import React from 'react'

import { Placeholder, Container, Navigation } from './styles'
import Text from '../text'

export const Navbar = () => {
  const optionStyle = {
    marginLeft: 20
  }
  return (
    <>
      <Container >
        <Text to={'/#author'} bold size={30}>
          GEEKRODION
        </Text>
        <Navigation>
          <Text style={optionStyle} to={'/#projects'} bold size={16}>PROJECTS</Text>
          <Text style={optionStyle} to={'/blog/programming'} bold size={16}>BLOG</Text>
        </Navigation>
      </Container>
      <Placeholder/>
    </>
  )
}

export default Navbar
