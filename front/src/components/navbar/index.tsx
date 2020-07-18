import React from 'react'

import { Placeholder, Container, Navigation } from './styles'
import Text from '../text'

const getScrollTo = (id: string) => () => {
  const element = document.querySelector(`#${id}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export const Navbar = () => {
  return (
    <>
      <Container>
        <Text onClick={getScrollTo('author')} bold size={30}>
          GEEKRODION
        </Text>
        <Navigation>
          <Text onClick={getScrollTo('projects')} bold size={16}>
            PROJECTS
          </Text>
        </Navigation>
      </Container>
      <Placeholder/>
    </>
  )
}

export default Navbar