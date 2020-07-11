import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${p => p.theme.color.background};
  }

  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  body {
    margin: 0px;
  }

  div[role="group"][tabindex] {
    height: 100%;
  }

  * {
    margin: 0;
    outline: none;
    box-sizing: border-box;
    font-family: 'Regular', sans-serif;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0)
  }
`

const MAX_WIDTH = 1220

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background: ${p => p.theme.color.background};
  display: flex;
  justify-content: center;
`

export const Content = styled.div`
  width: ${MAX_WIDTH}px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  @media(max-width: ${MAX_WIDTH + 40}px) {
    width: 94vw;
  }
`