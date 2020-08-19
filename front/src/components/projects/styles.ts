import styled from 'styled-components'

import { minHeightStyle } from '../styles'

const ONE_COLUMN_WIDTH = '900px'

export const Container = styled.div`
  display: flex;
  @media(min-width: ${ONE_COLUMN_WIDTH}) {
    ${minHeightStyle};
  }
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media(max-width: ${ONE_COLUMN_WIDTH}) {
    flex-direction: column;
  }
`

export const ProjectFrame = styled.iframe`
  width: 100%;
  flex: 1;
  border: none;
  border-radius: 20px;
  box-shadow: 2px 14px 20px #0C111467;
  margin: 10px 0;
  @media(min-width: ${ONE_COLUMN_WIDTH}) {
    :nth-child(even) {
      margin-left: 10px;
    }
    :nth-child(odd) {
      margin-right: 10px;
    }
  }
  height: 800px;
  @media(min-width: ${ONE_COLUMN_WIDTH}) and (max-height: 820px) {
    height: 98%;
  }
`