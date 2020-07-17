import React from 'react'
import { useMediaQuery } from 'beautiful-react-hooks'

import Text from '../../text'
import { AboutAuthorContainer, AboutAuthorTextWrapper } from './styles'
import Social from '../social'
import { MOBILE_WIDTH } from '../styles'

const AuthorAbout = () => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`)

  return (
    <AboutAuthorContainer>
      <AboutAuthorTextWrapper>
        <Text>Hi, I’m Rodion 👋</Text>
      </AboutAuthorTextWrapper>
      <Text bold size={isMobile ? 22 : 34}>I develop software, make content, and create indie projects</Text>
      {!isMobile && (
        <>
          <AboutAuthorTextWrapper>
            <Text>I strive to stay open-minded, so my interests change over time. Right now, I’m fascinated with the idea of bootstrapped SAAS, how to balance productivity with creativity, and being comfortable with myself.</Text>
          </AboutAuthorTextWrapper>
          <Social/>
        </>
      )}
    </AboutAuthorContainer>
  )
}

export default AuthorAbout