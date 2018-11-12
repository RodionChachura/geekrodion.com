import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/fontawesome-free-solid'

const Achievement = styled.div`
  margin: 40px;
  font-size: 1.8vmax;
  color: ${props => props.theme.color.fontColor};
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default ({ children }) => (
  <Achievement>
    <FontAwesomeIcon style={{ paddingRight: 20, color: '#39CCCC' }} size={'2x'} icon={faRocket}/>
    {children}
  </Achievement>
)