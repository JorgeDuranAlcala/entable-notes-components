import { themePalette, LIGHT, DARK } from './palette'
export type LIGHTORDARK = 'light' | 'dark'
export { default } from './theme-provider'
export { default as theme } from './theme'
export { default as makePalette,  } from './palette'
export { default as typography } from './typography'
export { default as ThemeContext } from './theme-context'
export { default as ThemeProvider } from './theme-provider'
export { themePalette, LIGHT, DARK }

const Themes = {
  basil: null,
  crane: null,
  material: null,
  materialDark: null,
  pinky: null,
  rally: null,
  reply: null,
}
export type Color = 'primary' | 'success' | 'info' | 'accent' | 'warning' | 'danger' | 'error' | 'default'
export type ColorValue = {
    light: string,
    main: string,
    dark: string,
    contrastText: string
}
export type ColorObj = {
  [key in Color] : ColorValue
}

export type ThemeType = keyof typeof Themes
export type ThemeZoom = {
  theme: ThemeType
  zoom: number
}
export const AVAILABLE_THEMES = Object.keys(Themes) as ThemeType[]
export const unit = 'rem'
export const tablePadding = [1,0]
export const FONT_BASIS = 2