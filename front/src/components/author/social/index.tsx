import React from 'react'
import { faInstagram, faLinkedin, faYoutube, faMedium, faGithub, faTwitter, IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMediaQuery } from 'beautiful-react-hooks'

import { ResourceUrl } from '../../../constants/links'
import { Container, SocialLink } from './styles'
import Text, { TextColor } from '../../text'
import { MOBILE_WIDTH } from '../styles'
import Age from '../age'
import { AgeContainer } from './styles'

type Icon = [string, IconDefinition]

const ICONS: Icon[] = [
  [ResourceUrl.Instagram, faInstagram],
  [ResourceUrl.LinkedIn, faLinkedin],
  [ResourceUrl.YouTube, faYoutube],
  [ResourceUrl.Medium, faMedium],
  [ResourceUrl.GitHub, faGithub],
  [ResourceUrl.Twitter, faTwitter]
]

const Social = () => {
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_WIDTH}px)`)

  return (
    <>
      {isMobile && (
        <AgeContainer>
          <Age/>
        </AgeContainer>
      )}
      <Container>
        {ICONS.map(([href, icon]: Icon) => (
          <SocialLink key={href} href={href} target="_blank" rel="noopener noreferrer" >
            <Text color={TextColor.PRIMARY} size={isMobile ? 30 : 24}>
              <FontAwesomeIcon icon={icon} />
            </Text>
          </SocialLink>
        ))}
      </Container>
      {!isMobile && <Age/>}
    </>
  )
}

export default Social