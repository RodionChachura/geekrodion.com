import React from 'react'

import { Placeholder, Container, Navigation } from './styles'
import Text from '../text'
import Option from './option'

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
          <Option text="PROJECTS" onClick={getScrollTo('projects')} />
          <Option text="SERIES" onClick={getScrollTo('series')} />
        </Navigation>
      </Container>
      <Placeholder/>
    </>
  )
}

export default Navbar