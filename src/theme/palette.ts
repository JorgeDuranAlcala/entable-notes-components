import { grey, red, blue, teal, pink, lightBlue, yellow, orange, green, deepPurple, blueGrey } from '@material-ui/core/colors'
import { Theme, getContrastText } from '@material-ui/core/styles'
import { emphasize, darken, lighten  } from '@material-ui/core/styles/colorManipulator'
import { lightenOrDarkenColor, isLightColor } from 'helpers/color'
import GlobalContext from 'context/global-context'

import { ThemeZoom, Color, ColorValue, ColorObj } from './index'

export const WHITE = '#fff'
export const BLACK = '#000'
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

export enum PaletteType  {
  pastel = 'pastel',
  dark = 'dark',
  medium = 'medium',
  all = 'all'
}

export  const Colors = {
  grey,
  red,
  blue,
  teal,
  pink,
  lightBlue,
  yellow,
  orange,
  green,
  deepPurple,
  blueGrey
}

export enum Palettes  {
  labels = PaletteType.pastel,
  status = PaletteType.dark,
  projects = PaletteType.medium,
  avatar = PaletteType.all,
  priority = PaletteType.medium,
  otherLight = PaletteType.pastel,
  otherDark = PaletteType.dark,
  otherMedium = PaletteType.medium
}

export const PALETTE_PASTELS = ['100', '200', 'A100']
export const PALETTE_MEDIUM = ['300', '400', 'A200', 'A400', 'A700']
export const PALETTE_DARK = ['500', '600', '700', '800', '900']
export const PALETTE_ALL = [...PALETTE_PASTELS, ...PALETTE_MEDIUM, ...PALETTE_DARK]

export type PaletteColor = {
  bg: string
  text: string
}

export function getPalettesColors(pal: Palettes, all:boolean = true) {
  const colors:PaletteColor[] = []
  let shades: any[]
  
  switch (Palettes[pal]) {
    case PaletteType.dark:
      shades = PALETTE_DARK
      break
    case PaletteType.medium:
      shades = PALETTE_MEDIUM
      break
    case PaletteType.pastel:
      shades = PALETTE_PASTELS
      break
    case PaletteType.all:
      shades = PALETTE_ALL
  }

  if (!all) {
    // @ts-ignore
    shades.length = 1
  }

  Object.keys(Colors).forEach(color => {
    shades.forEach(shade => {
      const bg = color[shade]
      const text = getContrastText(bg)
      colors.push({
        bg,
        text
      })
    })
  })
  return colors
}

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
function getColorObj(color: any, label:string, value: number = 600, offset:number=300): ColorValue {
  const light = color[value - offset]
          ? color[value - offset]
          : lightenOrDarkenColor(color, -50)
  const main = color[value]
          ? color[value]
          : color
  const dark = color[value + offset]
          ? color[value + offset]
          : lightenOrDarkenColor(color, 50)
  const colorMain = label === 'yellow' ? BLACK : WHITE
  const secondColor = colorMain === BLACK ? blueGrey[800] : blueGrey[50]
  const ret = {
    light,
    main,
    dark,
    contrastText: color[50] ? color[50] : emphasize(light),
    color: colorMain,
    secondColor: secondColor,
    inverse: {
      light: color[100]? color[100] : emphasize(light),
      main: color[50] ? color[50]: emphasize(main),
      dark: color[200] ? color[200]: emphasize(main),
      contrastText: color[900] ? color[900]: emphasize(main),
      color: BLACK,
      secondColor: blueGrey[800]
    }
  }
  return ret;
}

const danger = getColorObj(red,'red')
const dark = {
  light: blueGrey[700],
  main: blueGrey[900],
  dark: blueGrey[800],
  contrastText: blueGrey[50],
  secondColor: blueGrey[50],
  color: WHITE,
  inverse: {
    light: blueGrey[50],
    main: WHITE,
    dark: blueGrey[100],
    contrastText: blueGrey[900],
    color: DARK,
    secondColor: blueGrey[800]
  }
}
const light = {
  light: dark.inverse.light,
  main: dark.inverse.main,
  dark: dark.inverse.dark,
  contrastText: dark.inverse.contrastText,
  color: dark.inverse.color,
  secondColor: dark.inverse.secondColor,
  inverse: {
    light: dark.light,
    main: dark.main,
    dark: dark.dark,
    contrastText: dark.contrastText,
    color: dark.color,
    secondColor: dark.secondColor
  }
}

export const defaultColors: ColorObj = {
  default: getColorObj(grey,'grey'),
  neutral: light,
  inverse: dark,
  primary: getColorObj(lightBlue, 'lightblue'),
  secondary: getColorObj(deepPurple, 'deeppurple'),
  success: getColorObj(green, 'green'),
  info: getColorObj(blue, 'blue'),
  accent: getColorObj(yellow, 'yellow'),
  warning: getColorObj(orange, 'orange'),
  side: getColorObj(blueGrey,'bluegrey'),
  danger,
  error: danger,
}

const makePalette = (themeZoom: ThemeZoom, colors = { ...defaultColors }) => {
  const { theme } = themeZoom

  if (themePalette[theme].type === DARK) {
    defaultColors.neutral = dark
    defaultColors.inverse = light
  } else {
    defaultColors.neutral = light
    defaultColors.inverse = dark
  }

  const { contrastText, ...rest } = themePalette[theme]
  const cols: Color[] = Object.keys(colors) as Color[]
 
  const clrs = cols.reduce((obj:ColorObj, color: Color) => {
    const col:ColorValue = colors[color]
    obj[color] = {...col}
    return obj
  }, {...colors})
  const palette = {
    ...rest,
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

export function getColors(theme: Theme, props: any)  {
  const { shade = 'main', bg = "neutral", color, style, inverse, round,  ...rest } = props
  const { palette } = theme
  // @ts-ignore
  let bgColorObj: any = palette[bg]
  let bgColor: string = ''
  if (inverse) {
    bgColorObj = bgColorObj.inverse
  }
  bgColor = bgColorObj[shade]
  let textColor: string = bgColorObj.color
  const hasBorder = rest.border || rest.borderRight || rest.borderLeft || rest.borderTop || rest.borderBottom
  debugger
  let borderColor: string = ''
  if (hasBorder && !rest.borderColor) {
    borderColor = shade === 'dark' ? bgColorObj.main
      : shade === 'light' ? bgColorObj.main
        : bgColorObj.light
  }
  if (color === 'inverse') {
    textColor = bgColorObj[shade]
    bgColor = bgColorObj.contrastText
    if (!rest.borderColor && shade === 'main') {
      borderColor = bgColorObj.dark
    }
  }
  return {
    borderColor: rest.borderColor || borderColor,
    textColor: rest.textColor || textColor,
    bgColor: rest.bgColor || bgColor
  }
}

export default makePalette