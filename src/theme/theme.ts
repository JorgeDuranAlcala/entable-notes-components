import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'
import { ITheme } from 'types'
import { GlobalContext } from 'context/global-context'
import { FONT_BASIS, makePalette, ThemeZoom, unit, tablePadding } from './index'
import { roundNum } from 'helpers'
// https://www.sipios.com/blog-tech/how-to-use-styled-components-with-material-ui-in-a-react-app
import typography from './typography'

function createTheme(variant: ThemeZoom): ITheme {
  let palette: any = makePalette(variant)
  const { zoom } = variant
  const { colors } = palette
  delete palette.colors
  GlobalContext.palette = colors
  GlobalContext.palette.type = palette.type
  GlobalContext.palette.contrastText = palette.contrastText
  palette = { ...palette, ...colors }
  GlobalContext.setThemeZoom(variant)
  const theme = createMuiTheme({
    zoomFontSize: (factor: number): string => `${roundNum(0.3 * factor * zoom)}${unit}`,
    zoomSpacing: (factor: number) => spacing(roundNum(factor * zoom)),
    fontSize: GlobalContext.fontSize,
    spacing: (factor: number) => `${roundNum(0.6 * factor)}${unit}`,
    lineHeight: GlobalContext.fontSize,
  }) as ITheme
  const { spacing, zoomSpacing, zoomFontSize } = theme
  const fontSize = {
    xs: zoomFontSize(FONT_BASIS),
    sm: zoomFontSize(FONT_BASIS + 0.5),
    md: zoomFontSize(FONT_BASIS + 1),
    lg: zoomFontSize(FONT_BASIS + 1.5),
    xl: zoomFontSize(FONT_BASIS + 2),
  }
  const lineHeight = {
    xs: zoomFontSize(FONT_BASIS + 0.25),
    sm: zoomFontSize(FONT_BASIS + 0.75),
    md: zoomFontSize(FONT_BASIS + 1.25),
    lg: zoomFontSize(FONT_BASIS + 1.75),
    xl: zoomFontSize(FONT_BASIS + 2.25),
  }
  let padding: string = tablePadding[0].toString()
  if (tablePadding[0]) {
    padding += unit
  }
  padding += ' '
  padding += tablePadding[1].toString()
  if (tablePadding[1]) {
    padding += unit
  }
  GlobalContext.fontSize = fontSize
  const modTheme: ITheme = createMuiTheme(
    /**
     * @see https://material-ui.com/customization/themes/#theme-configuration-variables
     * https://material-ui.com/customization/typography/
     */
    {
      palette,
      zoomFontSize,
      typography,
      spacing,
      zoomSpacing,
      fontSize,
      lineHeight,
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
      zIndex: {
        appBar: 1200,
        drawer: 1100,
      },
      overrides: {
        MuiDrawer: {
          paper: {
            background: '#18202c',
          },
        },
        MuiPaper: {
          // Name of the component ?????? / style sheet
          elevation0: {
            // Name of the rule
            boxShadow: '0 0 14px 0 rgba(53,64,82,.05)', // Some CSS
          },
        },
        MuiTableCell: {
          root: {
            borderBottom: '1px solid rgba(224, 224, 224, .5)',
            lineHeight: lineHeight.md,
            fontSize: fontSize.md,
            backgroundColor: theme.palette.background.default,
          },
        },
        MuiAutocomplete: {
          root: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.getContrastText(theme.palette.background.default),
          },
        },
        MuiButton: {
          root: {
            color: theme.palette.primary.contrastText,
          },
        },
        MuiTextField: {
          root: {
            variant: 'outlined',
          },
        },
      },
    }
  ) 
  //  return responsiveFontSizes(modTheme)
  GlobalContext.theme = theme
  return modTheme
}

export default createTheme
