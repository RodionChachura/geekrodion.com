import React from 'react'
import styled from 'styled-components'
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faMedium,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'

import IconLink from './icon-link'
import {
  MEDIUM_URL,
  YOUTUBE_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL
} from '../../constants'

const BottomPhotoPart = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 20px;
`

const links = [
  [faInstagram, INSTAGRAM_URL],
  [faLinkedin, LINKEDIN_URL],
  [faGithub, GITHUB_URL],
  [faMedium, MEDIUM_URL],
  [faYoutube, YOUTUBE_URL]
]

export default () => (
  <BottomPhotoPart>
    {links.map(([icon, destination]) => (
      <IconLink {...{ icon, destination }} key={destination} />
    ))}
  </BottomPhotoPart>
)
