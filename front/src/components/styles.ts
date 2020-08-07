import { css } from 'styled-components'
import { NAVBAR_HEIGHT } from './navbar/styles'

export const minHeightStyle = css`
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
`