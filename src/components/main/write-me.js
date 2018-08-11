import React from 'react'
import styled from 'styled-components'

import { EMAIL } from '../../constants';

const WriteMe = styled.div`
  font-size: 24px;
  padding: 20px;
  text-align: center;
  color: ${props => props.theme.color.fontColor};
`

const Email = styled.a`
  color: ${props => props.theme.color.fontColor};
`

export default () => (
  <WriteMe>Write me at <Email href={`mailto:${EMAIL}`}>{EMAIL}</Email></WriteMe>
)