import React, { useState } from 'react'

import { ThemeContext, ThemeProvider, ThemeZoom, LIGHTORDARK, themePalette } from 'theme'
import GlobalContext from 'context/global-context'
import 'styles/index.scss'

export default (props: any) => {
  const [themeZoom, setThemeZoom] = useState<ThemeZoom>(GlobalContext.themeZoom)
  const { theme } = themeZoom
  const [type, setType] = useState(themePalette[theme].type as LIGHTORDARK)

  return (
    <ThemeContext.Provider value={{ themeZoom, setThemeZoom, type, setType }}>
      <ThemeProvider>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
