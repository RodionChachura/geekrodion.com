import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
  body {
    background: var(--primary-color);
  }

  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;

    --primary-color: #edc988;
    --primary-second-color: #d7385e;
    --primary-third-color: #f8efd4;
    --background-color: hsl(210deg, 30%, 8%);
    --background-light-color: hsl(210deg, 30%, 12%);
    --text-color: hsl(0deg, 0%, 100%);
    --text-light-color: hsl(210deg, 14%, 66%);
    --half-transparent-color: rgba(255, 255, 255, 0.15);
    --almost-transparent-color: rgba(255, 255, 255, 0.15);
    --shadow-color: #0C111467;

    --default-transition: 0.35s ease-in-out;
    --default-shadow: 2px 14px 20px var(--shadow-color);
    --small-shadow: 2px 4px 4px var(--shadow-color);
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
export const FULL_WIDTH_BREAKPOINT = MAX_WIDTH + 40
export const FULL_WIDTH = '94vw'

export const Container = styled.div`
  width: 100%;
  min-height: 100%;
  transition: var(--default-transition);
  background: var(--background-color);
  display: flex;
  justify-content: center;
`

export const Content = styled.div`
  width: ${MAX_WIDTH}px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  @media(max-width: ${FULL_WIDTH_BREAKPOINT}px) {
    width: ${FULL_WIDTH};
  }
`
