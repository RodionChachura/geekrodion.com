import styled, { createGlobalStyle } from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background: ${p => p.theme.color.background};
`

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${p => p.theme.color.background};
  }

  html {
    height: 100%;
  }
  body {
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