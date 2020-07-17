import styled from 'styled-components'

export const ONE_COLUMN_WIDTH = 800
export const MOBILE_WIDTH = 600

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;
  @media(max-width: ${ONE_COLUMN_WIDTH}px) {
    flex-direction: column;
    align-items: flex-start;
    width: initial;
  }
`