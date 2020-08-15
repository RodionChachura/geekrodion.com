import styled from 'styled-components'
import { minHeightStyle } from '../styles'

export const Container = styled.div`
  ${minHeightStyle};
  display: flex;
`

export const SeriesContainer = styled.div`
  margin: 40px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  @media(max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media(max-width: 760px) {
    grid-template-columns: 100%;
  }
`