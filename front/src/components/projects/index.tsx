import React, { useRef } from 'react'
import { useViewportSpy } from 'beautiful-react-hooks'

import { Container, Content, ProjectFrame } from './styles'
import { EMBEDDED_INCREASER, EMBEDDED_BOOKSCONCEPTS } from '../../constants/links'

const Projects = () => {
  const ref = useRef()
  const isVisible = useViewportSpy(ref)
  return (
    <Container ref={ref} id={'projects'}>
      {isVisible && (
        <Content>
          <ProjectFrame src={EMBEDDED_INCREASER}></ProjectFrame>
          <ProjectFrame src={EMBEDDED_BOOKSCONCEPTS}></ProjectFrame>
        </Content>
      )}
    </Container>
  )
}

export default Projects