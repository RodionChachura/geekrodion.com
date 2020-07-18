import React from 'react'

import { Container, Content, ProjectFrame } from './styles'
import { EMBEDDED_INCREASER, EMBEDDED_BOOKSCONCEPTS } from '../../constants/links'

const Projects = () => {
  return (
    <Container>
      <Content>
        <ProjectFrame src={EMBEDDED_INCREASER}></ProjectFrame>
        <ProjectFrame src={EMBEDDED_BOOKSCONCEPTS}></ProjectFrame>
      </Content>
    </Container>
  )
}

export default Projects