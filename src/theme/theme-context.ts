import React from 'react'
import { LIGHTORDARK } from './index'
// Create a context for the current theme (with null as the default).
import { ThemeZoom } from './index'
interface ThemeContextProps {
  themeZoom: ThemeZoom
  setThemeZoom: (themeZoom: ThemeZoom) => void
  type: LIGHTORDARK
  setType: (type: LIGHTORDARK) => void
}
export const ThemeContext = React.createContext({} as ThemeContextProps)

export default ThemeContext
