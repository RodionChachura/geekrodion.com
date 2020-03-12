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
  GITHUB_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  YOUTUBE_CODING_URL,
  YOUTUBE_INCREASER_URL
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
  [faYoutube, YOUTUBE_INCREASER_URL, 1],
  [faYoutube, YOUTUBE_CODING_URL, 2]
]

export default () => (
  <BottomPhotoPart>
    {links.map(([icon, destination, text]) => (
      <IconLink {...{ icon, destination, text }} key={destination} />
    ))}
  </BottomPhotoPart>
)
