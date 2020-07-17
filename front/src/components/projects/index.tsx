import React from 'react'

import { Container, Content, ProjectFrame } from './styles'
import { EMBEDDED_INCREASER } from '../../constants/links'

const Projects = () => {
  return (
    <Container>
      <Content>
        <ProjectFrame src={EMBEDDED_INCREASER}></ProjectFrame>
      </Content>
    </Container>
  )
}

export default Projects