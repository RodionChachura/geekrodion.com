import styled from 'styled-components'

import { MAX_WIDTH } from '../../layout/styles'
import { ONE_COLUMN_WIDTH } from '../styles'

export const MAX_SIDE = 600

export const Container = styled.div`
  width: ${MAX_SIDE}px;
  height: ${MAX_SIDE}px;
  overflow: hidden;
  border-radius: 40px;
  box-shadow: 2px 14px 20px #0C111467;
  @media(max-width: ${MAX_WIDTH}px) {
    width: 40vw;
    height: 40vw;
  }
  @media(max-width: ${ONE_COLUMN_WIDTH}px) {
    width: 94vw;
    height: 94vw;
  }
`