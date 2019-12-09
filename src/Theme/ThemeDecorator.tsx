import React from 'react'
import { ThemeProvider } from 'styled-components'

import * as theme from './theme'

const ThemeDecorator = (storyFn: any) => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
)

export default ThemeDecorator
