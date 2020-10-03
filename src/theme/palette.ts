import { grey, red, blue, teal, pink, lightBlue, yellow, orange, green, deepPurple, blueGrey } from '@material-ui/core/colors'
import { Theme } from '@material-ui/core/styles'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import { lightenOrDarkenColor, getContrastText } from 'helpers/color'
import { ThemeZoom, Color, ColorValue, ColorObj } from './index'


export const WHITE = '#fff'
export const BLACK = '#000'
export const DARK = 'dark'
export const LIGHT = 'light'
export const lightDefaults = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.54)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)',
    // Text hints.
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: WHITE,
    default: grey[50],
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverOpacity: 0.08,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.14)',
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
}

export const darkDefaults = {
  text: {
    primary: WHITE,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: grey[800],
    default: '#303030',
  },
  action: {
    active: WHITE,
    hover: 'rgba(255, 255, 255, 0.1)',
    hoverOpacity: 0.1,
    selected: 'rgba(255, 255, 255, 0.2)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },
}

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


export enum PaletteType  {
  pastel = 'pastel',
  dark = 'dark',
  medium = 'medium',
  all = 'all'
}

export  const Colors = {
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
  space = PaletteType.dark,
  avatar = PaletteType.pastel,
  priority = PaletteType.medium,
  otherLight = PaletteType.pastel,
  otherDark = PaletteType.dark,
  otherMedium = PaletteType.medium,
  otherAll = PaletteType.all
}

export const PALETTE_PASTELS = ['100', '200', 'A100']
export const PALETTE_MEDIUM = ['300', '400', 'A200', 'A400', 'A700']
export const PALETTE_DARK = ['500', '600', '700', '800', '900']
export const PALETTE_ALL = [...PALETTE_PASTELS, ...PALETTE_MEDIUM, ...PALETTE_DARK]

export type PaletteColor = {
  clr: string
  bg: string
  text: string
}

export function getPaletteColors(pal: Palettes, all: boolean=false, color?: string) {
  const colors:PaletteColor[] = []
  const colorKeys = color ? [color] : Object.keys(Colors)
  let shades: any[]
  const allShades = all || !!color

  switch (Palettes[pal]) {
    case PaletteType.dark:
      shades = [...PALETTE_DARK]
      break
    case PaletteType.medium:
      shades = [...PALETTE_MEDIUM]
      break
    case PaletteType.pastel:
      shades = [...PALETTE_PASTELS]
      break
    case PaletteType.all:
    default:
      shades = [...PALETTE_ALL]
  }

  if (!allShades) {
    shades.splice(0, shades.length / 2)
    shades.length=1
  }
  colorKeys.forEach(clr => {
    shades.forEach(shade => {
      // @ts-ignore
      const bg = Colors[clr][shade] as string
      const text = getContrastText(bg)
      colors.push({
        clr: clr,
        bg,
        text
      })
    })
  })
  return colors
}

export function getHashColor(hash: number, pal: Palettes = Palettes.otherAll) {  
  const colors = getPaletteColors(pal, true)
  const idx = hash % colors.length
  return colors[idx]
}

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