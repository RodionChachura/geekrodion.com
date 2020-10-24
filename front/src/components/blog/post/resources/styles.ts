import styled from 'styled-components'

import { WIDTH } from '../styles'
import { NAVBAR_HEIGHT } from '../../../navbar/styles'

export const RESOURCE_WIDTH = 200
export const RESOURCE_GAP = 20

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${RESOURCE_GAP}px;
`

export const SIDE_RESOURCES_MARGIN = 40

export const SideContainer = styled.div`
  position: fixed;
  display: grid;
  transform: translateX(-50%);
  top: ${NAVBAR_HEIGHT + 50}px;
  left: calc(50% + ${WIDTH / 2}px + ${SIDE_RESOURCES_MARGIN}px + ${RESOURCE_WIDTH / 2}px);
  grid-gap: ${RESOURCE_GAP}px;
`