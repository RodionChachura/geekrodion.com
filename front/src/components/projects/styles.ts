import styled from 'styled-components'

import { NAVBAR_HEIGHT } from '../navbar/styles'

export const Container = styled.div`
  min-height: calc(100% - ${NAVBAR_HEIGHT}px);
  background: darkcyan;
`