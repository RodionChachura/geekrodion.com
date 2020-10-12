import styled from 'styled-components'

import { WIDTH } from '../styles'
import { NAVBAR_HEIGHT } from '../../../navbar/styles'

export const RESOURCE_WIDTH = 160
export const RESOURCE_GAP = 20

export const Container = styled.div`
  display: grid;
  grid-gap: ${RESOURCE_GAP}px;
  grid-template-columns: repeat(auto-fill, ${RESOURCE_WIDTH}px);
`

export const SIDE_RESOURCES_MARGIN = 40

export const SideContainer = styled.div`
  position: fixed;
  display: grid;
  transform: translateX(-50%);
  top: ${NAVBAR_HEIGHT + 50}px;
  left: calc(50% + ${WIDTH / 2}px + ${SIDE_RESOURCES_MARGIN}px + ${RESOURCE_WIDTH / 2}px);
  grid-gap: ${RESOURCE_GAP}px;
  grid-template-columns: ${RESOURCE_WIDTH}px;
`