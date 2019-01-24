import React from 'react'
import styled from 'styled-components'

const Achievement = styled.div`
  margin: 40px;
  font-size: 1.8vmax;
  color: ${props => props.theme.color.mainFont};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default ({ children }) => <Achievement>{children}</Achievement>
