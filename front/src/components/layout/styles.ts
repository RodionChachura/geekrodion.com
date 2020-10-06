import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    background: ${p => p.customBackground || p.theme.color.background};
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
    font-family: 'Nunito', sans-serif;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0)
  }
`

export const MAX_WIDTH = 1220

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  transition: ${p => p.theme.transition.default};
  background: ${p => p.customBackground || p.theme.color.background};
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