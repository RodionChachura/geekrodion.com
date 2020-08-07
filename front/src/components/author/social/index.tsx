import React from 'react'
import { faInstagram, faLinkedin, faYoutube, faMedium, faGithub, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMediaQuery } from 'beautiful-react-hooks'

import { INSTAGRAM, LINKEDIN, YOUTUBE, MEDIUM, GITHUB } from './constants'
import { Container, SocialLink } from './styles'
import Text, { TextColor } from '../../text'
import { MOBILE_WIDTH } from '../styles'
import Age from '../age'

type Icon = [string, IconDefinition]

const ICONS = [
  [INSTAGRAM, faInstagram],
  [LINKEDIN, faLinkedin],
  [YOUTUBE, faYoutube],
  [MEDIUM, faMedium],
  [GITHUB, faGithub]
]

const Social = () => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`)

  return (
    <>
      <Container>
        {ICONS.map(([href, icon]: Icon) => (
          <SocialLink key={href} href={href} target="_blank" rel="noopener noreferrer" >
            <Text color={TextColor.PRIMARY} size={isMobile ? 30 : 24}>
              <FontAwesomeIcon icon={icon} />
            </Text>
          </SocialLink>
        ))}
      </Container>
      <Age/>
    </>
  )
}

export default Social