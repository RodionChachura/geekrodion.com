import React from 'react'
import { ThemeProvider } from 'styled-components'
import "prismjs/plugins/command-line/prism-command-line.css"

import theme from './src/themes/theme'

export const wrapRootElement  = ({ element }) => (
  <ThemeProvider theme={theme}>
    {element}
  </ThemeProvider>
)