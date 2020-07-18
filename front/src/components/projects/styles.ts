import styled from 'styled-components'

import { NAVBAR_HEIGHT } from '../navbar/styles'

export const Container = styled.div`
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px);
  display: flex;
`

export const Content = styled.div`
  flex: 1;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`

export const ProjectFrame = styled.iframe`
  width: 100%;
  margin: 10px 0;
  flex: 1;
  border: none;
  border-radius: 20px;
  box-shadow: 2px 14px 20px #0C111467;
`