import React from 'react'
import { withTheme } from 'styled-components'
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faPlayCircle, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'beautiful-react-hooks'

import Resource from './resource'
import { Container, SideContainer, RESOURCE_WIDTH, SIDE_RESOURCES_MARGIN } from './styles'
import { WIDTH } from '../styles'

interface Props {
  resources: string[],
  theme: any
}

enum Type {
  GitHub = "GitHub",
  Udemy = "Udemy",
  Demo = "Demo",
  YouTube = "YouTube"
}

const TEXT_FOR_TYPE = {
  [Type.GitHub]: "Source Code",
  [Type.Udemy]: "On Udemy",
  [Type.Demo]: "Check It Out",
  [Type.YouTube]: "On YouTube"
}

const COLOR_FOR_TYPE = {
  [Type.GitHub]: 'headline',
  [Type.Udemy]: 'link',
  [Type.Demo]: 'secondary',
  [Type.YouTube]: 'link',
}

const ICON_FOR_TYPE = {
  [Type.GitHub]: faGithub,
  [Type.Udemy]: faPlayCircle,
  [Type.Demo]: faGamepad,
  [Type.YouTube]: faYoutube
}

const Resources = ({ resources, theme }: Props) => {
  const smallScreenSize = (SIDE_RESOURCES_MARGIN + RESOURCE_WIDTH) * 2 + WIDTH
  const isSmallScreen = useMediaQuery(`(max-width: ${smallScreenSize}px)`)

  const renderContent = () => resources.map(resource => {
    const [type, to] = resource.split(' ')
    return (
      <Resource
        key={to}
        to={to}
        text={TEXT_FOR_TYPE[type]}
        color={theme.blog.color[COLOR_FOR_TYPE[type]]}
        icon={ICON_FOR_TYPE[type]}
      />
    )
  })
  
  if (isSmallScreen) {
    return (
      <Container>
        {renderContent()}
      </Container>
    )
  }

  return (
    <SideContainer>
      {renderContent()}
    </SideContainer>
  )
}

export default withTheme(Resources)