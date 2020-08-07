import styled from 'styled-components'

import { NAVBAR_HEIGHT } from '../navbar/styles'
import { minHeightStyle } from '../styles'

export const ONE_COLUMN_WIDTH = 800
export const MOBILE_WIDTH = 600

export const Container = styled.div`
  width: 100%;
  ${minHeightStyle};
  display: flex;
  align-items: center;
  margin: 20px 0;
  @media(max-width: ${ONE_COLUMN_WIDTH}px) {
    flex-direction: column;
    align-items: flex-start;
    width: initial;
  }
`