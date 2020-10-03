import { themePalette, getColors, LIGHT, DARK } from './palette'
export type LIGHTORDARK = 'light' | 'dark'
export { default } from './theme-provider'
export { default as theme } from './theme'
export { default as makePalette } from './palette'
export { default as typography } from './typography'
export { default as ThemeContext } from './theme-context'
export { default as ThemeProvider } from './theme-provider'
export { themePalette, LIGHT, DARK, getColors }

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type FontSize = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}
const Themes = {
  basil: null,
  crane: null,
  material: null,
  materialDark: null,
  pinky: null,
  rally: null,
  reply: null,
}
export type Color =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'accent'
  | 'warning'
  | 'danger'
  | 'error'
  | 'default'
  | 'side'
  | 'neutral'
  | 'inverse'

export type ColorValue = {
  light: string
  main: string
  dark: string
  contrastText: string
  inverse: {
    light: string
    main: string
    dark: string
    contrastText: string
  }
}
export type ColorObj = {
  [key in Color]: ColorValue
}

export type ColorPalette = {
  primary: ColorValue
  success: ColorValue
  info: ColorValue
  accent: ColorValue
  warning: ColorValue
  danger: ColorValue
  error: ColorValue
  default: ColorValue
  neutral: ColorValue
  neutralInverse: ColorValue
}

export type ThemeType = keyof typeof Themes
export type ThemeZoom = {
  theme: ThemeType
  zoom: number
}
export const AVAILABLE_THEMES = Object.keys(Themes) as ThemeType[]
export const unit = 'rem'
export const tablePadding = [1, 0]
export const FONT_BASIS = 2.5
export enum Shade {
  light = 'light',
  dark = 'dark',
  main = 'main',
}
