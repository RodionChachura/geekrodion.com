import styled from 'styled-components'

import { ONE_COLUMN_WIDTH } from '../styles'

export const AboutAuthorContainer = styled.div`
  flex: 1;
  margin-right: 40px;
  @media(max-width: ${ONE_COLUMN_WIDTH}px) {
    margin-right: 0;
    flex: 0;
  }
`

export const AboutAuthorTextWrapper = styled.div`
  margin: 10px 0;
`