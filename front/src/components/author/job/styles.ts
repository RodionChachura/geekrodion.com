import styled from 'styled-components'

import { MOBILE_WIDTH } from '../styles'

const HEIGHT = 34
const WIDTH = 90

export const Container = styled.div`
  position: absolute;
  border-radius: 5px;
  box-shadow: var(--default-shadow);
  background: var(--primary-color);
  cursor: pointer;
  right: -${WIDTH + 5}px;
  top: -${HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
  @media(max-width: ${MOBILE_WIDTH}px) {
    position: initial;
    top: initial;
    right: initial;
    margin-left: 10px;
  } 
`
