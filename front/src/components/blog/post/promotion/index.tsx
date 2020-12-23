import React, { useEffect, useRef, useState } from 'react'
import { useViewportSpy } from 'beautiful-react-hooks'

import { Container, Frame } from './styles'
import { EMBEDDED_INCREASER } from '../../../../constants/links'

const Projects = () => {
  const ref = useRef()
  const isVisible = useViewportSpy(ref)
  const [shouldStayVisible, setShouldStayVisible] = useState(isVisible)

  useEffect(() => {
    if (isVisible) {
      setShouldStayVisible(true)
    }
  }, [isVisible])

  return (
    <Container ref={ref}>
      {(isVisible || shouldStayVisible) && (
        <Frame src={EMBEDDED_INCREASER}></Frame>
      )}
    </Container>
  )
}

export default Projects