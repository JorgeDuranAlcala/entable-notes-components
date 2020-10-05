import { Theme, ThemeOptions, Palette, PaletteColor, PaletteColorOptions, PaletteOptions } from '@material-ui/core/styles/createMuiTheme'
import { themePalette, getColors, LIGHT, DARK } from './palette'
export type LIGHTORDARK = 'light' | 'dark'
export { default } from './theme-provider'
export { default as theme } from './theme'
export { default as makePalette,  } from './palette'
export { default as typography } from './typography'
export { default as ThemeContext } from './theme-context'
export { default as ThemeProvider } from './theme-provider'
export { themePalette, LIGHT, DARK, getColors }

export interface IPalette extends Palette {
  accent: PaletteColor
  danger: PaletteColor
  contrastText: string
  neutral: PaletteColor
  inverse: PaletteColor
  side: PaletteColor
  default: PaletteColor
  custom: {
      contrastText: string
      primary: string,
      secondary: string
  }
}

export interface IPaletteColorOptions extends PaletteColorOptions{
  light: string
  main: string
  dark: string
  color: string
  contrastText: string
  secondColor: string
  inverse: {
      light: string
      main: string
      dark: string
      color: string
      contrastText: string
      secondColor: string
  }
}

export interface IPalette extends Palette{
  accent: PaletteColor
  danger: PaletteColor
  contrastText: string
  neutral: PaletteColor
  inverse: PaletteColor
  side: PaletteColor
  default: PaletteColor
  custom: {
      contrastText: string
      primary: string,
      secondary: string
  }
}

export interface IThemeOptions extends ThemeOptions{
  zoomFontSize: (factor: number) => string
  zoomSpacing: (factor: number) => number
  fontSize: FontSize
  lineHeight: FontSize
  palette: PaletteOptions
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      variant: 'contained',
      disableElevation: true,
    },
    MuiTextField: {
      variant: 'outlined',
    },
  },
}

export interface ITheme extends Theme{
  zoomFontSize: (factor:number) => string
  zoomSpacing: (factor: number) => number
  fontSize: FontSize
  lineHeight: FontSize
  palette: PaletteColor
}

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
export type Color = 'primary' | 'secondary' | 'success' | 'info' | 'accent' | 'warning' | 'danger' | 'error' | 'default' | 'side' | 'neutral' | 'inverse'

export type ColorValue = {
  light: string,
  main: string,
  dark: string,
  contrastText: string
  inverse: {
    light: string,
    main: string,
    dark: string,
    contrastText: string
  }
}
export type ColorObj = {
  [key in Color] : ColorValue
}

export type  ColorPalette = {
  primary: ColorValue,
  success: ColorValue,
  info: ColorValue,
  accent: ColorValue,
  warning: ColorValue,
  danger: ColorValue,
  error: ColorValue,
  default: ColorValue,
  neutral: ColorValue,
  neutralInverse: ColorValue
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
export enum Shade {
  light = 'light',
  dark = 'dark',
  main = 'main'
}