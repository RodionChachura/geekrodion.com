import React from 'react'
import styled from 'styled-components'
import { faInstagram, faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons'

import IconLink from './icon-link'


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

export default () => (
  <BottomPhotoPart>
    <IconLink icon={faInstagram} destination={'https://www.instagram.com/geekrodion/'}/>
    <IconLink icon={faLinkedin} destination={'https://www.linkedin.com/in/rodion-chachura-04aa8a156/'}/>
    <IconLink icon={faGithub} destination={'https://github.com/RodionChachura'}/>
    <IconLink icon={faMedium} destination={'https://medium.com/@geekrodion'}/>
  </BottomPhotoPart>
)