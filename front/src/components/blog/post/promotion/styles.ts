import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100%;
`

export const Frame = styled.iframe`
  width: 100%;
  flex: 1;
  border: none;
  border-radius: 20px;
  margin: 10px 0;
  height: 800px;
  @media(max-height: 820px) {
    height: calc(100vh - 100px);
  }
`