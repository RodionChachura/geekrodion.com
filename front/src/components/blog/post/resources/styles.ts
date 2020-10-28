import styled from 'styled-components'

import { NAVBAR_HEIGHT } from '../../../navbar/styles'
import { FULL_WIDTH, FULL_WIDTH_BREAKPOINT, MAX_WIDTH } from '../../../layout/styles'

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
  top: ${NAVBAR_HEIGHT + 50}px;
  right: calc(50% - ${MAX_WIDTH / 2}px);
  grid-gap: ${RESOURCE_GAP}px;
  @media(max-width: ${FULL_WIDTH_BREAKPOINT}px) {
    right: calc(50% - ${FULL_WIDTH} / 2);
  }
`