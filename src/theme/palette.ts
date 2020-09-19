import { grey, red, blue, teal, pink, lightBlue, yellow, orange, green } from '@material-ui/core/colors'

import { lightenOrDarkenColor } from 'helpers/color'
import GlobalContext from 'context/global-context'

import { ThemeZoom, Color, ColorValue, ColorObj } from './index'

export const WHITE = '#fff'
export const BLACK = '000'
export const DARK = 'dark'
export const LIGHT = 'light'

export const themePalette = {
  basil: {
    type: LIGHT,
    background: { paper: 'rgb(254, 251, 230)', default: 'rgb(242, 245, 223)' },
    // eslint-disable-next-line
    custom: { primary: 'rgb(53, 104, 89)', secondary: 'rgb(234, 237, 216)' },
    contrastText: BLACK,
  },
  crane: {
    type: LIGHT,
    background: { paper: 'rgb(255, 255, 255)', default: 'rgb(237, 239, 235)' },
    custom: {
      primary: 'rgb(93, 16, 73)',
      secondary: 'rgb(240, 232, 237)',
    },
    contrastText: BLACK,
  },
  material: {
    type: LIGHT,
    background: { paper: 'rgb(255, 255, 255)', default: 'rgb(245, 245, 245)' },
    custom: {
      primary: 'rgb(25, 118, 210)',
      secondary: 'rgb(235, 241, 251)',
    },
    contrastText: BLACK,
  },
  materialDark: {
    type: DARK,
    background: { paper: 'rgb(66, 66, 66)', default: 'rgb(51, 51, 51)' },
    custom: {
      primary: 'rgb(33, 33, 33)',
      secondary: 'rgb(55, 55, 55)',
    },
    contrastText: WHITE,
  },
  pinky: {
    type: LIGHT,
    background: { paper: 'rgb(255, 255, 255)', default: 'rgb(255, 231, 240)' },
    custom: {
      primary: 'rgb(244, 3, 102)',
      secondary: 'rgb(255, 231, 240)',
    },
    contrastText: BLACK,
  },
  rally: {
    type: DARK,
    background: { paper: 'rgb(37, 40, 47)', default: 'rgb(50, 51, 61)' },
    custom: {
      secondary: 'rgb(52, 66, 60)',
      primary: 'rgb(26, 93, 87)',
    },
    contrastText: WHITE,
  },
  reply: {
    type: LIGHT,
    background: { paper: 'rgb(254, 254, 254)', default: 'rgb(237, 240, 242)' },
    custom: {
      secondary: 'rgb(238, 241, 243)',
      primary: 'rgb(52, 73, 85)',
    },
    contrastText: BLACK,
  },
}
// https://www.behance.net/gallery/95862937/Kulturminnefondet-rebranded
export const pastels=[
  '#D5C2BE', // mauve - brown
  '#F4D69D', // yellow
  '#c9e0e1', // cyan
  '#c5d8c1', // green
  '#b590ca', // lavendar
  '#eef9bf', // lemon green
  '#ffdcf7', // pink
  '#F9D9CA', // peach
  '#AEB6BF', // gray
  '#d4d6c8',
  '#BDC2BB',
  '#F0E4D4',
  '#AFAFC7',
  '#EEBAB2',
  '#F5F3E7'
]

export const projectColors = {
  green:'#b8df85', // apple green
  blue:'#81ACE5',  //   sky blue
  purple:'#AD7CEA', // purple
  gray: '#C2C2C2', // gray
  teal: teal[200],
  pink: pink[200],
  yellow: yellow[200],
  orange: orange[200]
}

export const darkPastels = pastels.map(pastel=>lightenOrDarkenColor(pastel,100))

export const paletteColors = {
  default:[
    '#b8df85', // apple green
    '#81ACE5',  //   sky blue
    '#AD7CEA', // purple
    '#C2C2C2', // gray
    teal[200],
    pink[200],
    yellow[200],
    orange[200]
  ]
}

export function getHashColor(hash: number, _pastel: boolean=true) {
  const { palette} = GlobalContext
  const idx = hash % pastels.length

  const color = (palette.type === DARK) ? pastels[idx] : darkPastels[idx]
  return color
}
/* 
export const red =  "#ef5350" // 400
export const pink = "#f8bbd0"
export const material = {
  "red": {
    "lightest": "#ffcdd2",
    "lighter": '#ef9a9a',
    "light": red, // 400
    "main": lightenOrDarkenColor(red, 50), // 500
    "dark": lightenOrDarkenColor(red, 75) // 700
  },
  "pink": {
    "lightest": lightenOrDarkenColor(pink, -50),
    "lighter": pink,
    "light": lightenOrDarkenColor(pink, 50),
    "main": "#f48fb1",
    "dark": "#f06292"
  }
} */

export const colors: ColorObj = {
  primary: {
    light: lightBlue[300],
    main: lightBlue[500],
    dark: lightBlue[700],
    contrastText: WHITE
  },
  success: {
    light: green[300],
    main: green[500],
    dark: green[700],
    contrastText: WHITE
  },
  info: {
    light: blue[300],
    main: blue[500],
    dark: blue[700],
    contrastText: WHITE
  },
  accent: {
    light: yellow[300],
    main: yellow[500],
    dark: yellow[700],
    contrastText: BLACK
  },
  warning: {
    light: orange[300],
    main: orange[500],
    dark: orange[700],
    contrastText: WHITE
  },
  danger: {
    light: red[300],
    main: red[500],
    dark: red[700],
    contrastText: WHITE
  },
  error: {
    light: red[300],
    main: red[500],
    dark: red[700],
    contrastText: WHITE
  },
  default: {
    light: grey[300],
    main: grey[500],
    dark: grey[700],
    contrastText: BLACK
  }
}

const makePalette = (themeZoom: ThemeZoom) => {
  const { theme } = themeZoom
  const { contrastText, ...rest } = themePalette[theme]
  const cols: Color[] = Object.keys(colors) as Color[]
  const clrs = cols.reduce((obj:ColorObj, color: Color) => {
    const col:ColorValue = colors[color]
    obj[color] = {...col, contrastText}
    return obj
  }, {...colors})
  const palette = {
    ...rest,
    contrastText,
    contrastThreshold: 2,
    border: '#DFE3E8',
    divider: '#DFE3E8',
    spacing: 1,
    common: {
      BLACK,
      WHITE,
    },
    colors: clrs
  }
  return palette
}

export default makePalette