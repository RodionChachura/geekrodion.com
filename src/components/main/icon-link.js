import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Link = styled.a`
  padding: 10px;
  border-radius: 10px;
  color: ${props => props.theme.color.fontColor};
  background-color: ${props => props.theme.color.backgroundColor};
  :hover {
    transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
    background-color: ${props => props.theme.color.fontColor};
    color: ${props => props.theme.color.backgroundColor};
  }
`

export default ({ destination, icon }) => (
  <Link target="_blank" href={destination}>
    <FontAwesomeIcon size={'4x'} icon={icon} />
  </Link>
)