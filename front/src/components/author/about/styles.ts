import styled from 'styled-components'

import { ONE_COLUMN_WIDTH } from '../styles'

export const Container = styled.div`
  flex: 1;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media(max-width: ${ONE_COLUMN_WIDTH}px) {
    margin-right: 0;
    flex: 0;
  }
`

export const TextWrapper = styled.div`
  margin: 10px 0;
  position: relative;
  display: flex;
  align-items: center;
`