// https://medium.com/javascript-in-plain-english/extend-material-ui-theme-in-typescript-a462e207131f
import { AutoCompleteClassKey } from '@material-ui/lab/Autocomplete'
import { Theme, ThemeOptions, Palette, PaletteColorOptions, PaletteOptions } from '@material-ui/core/styles/createMuiTheme';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
declare module '@material-ui/core/styles/createPalette' {
    interface PaletteColorOptions {
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
    interface PaletteOptions {  
        primary: PaletteColorOptions
        secondary: PaletteColorOptions
        danger: PaletteColorOptions
        error: PaletteColorOptions
        accent: PaletteColorOptions
        side: PaletteColorOptions
        neutral: PaletteColorOptions
        inverse: PaletteColorOptions
        contrastText: string
        custom: {
            contrastText: string
            primary: string
            secondary: string
        }
    }
    interface Palette {
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
}

declare module '@material-ui/core/styles/createMUITheme' {
    interface ThemeOptions {
        zoomFontSize: (factor: number) => string
        zoomSpacing: (factor: number) => number
        fontSize: FontSize
        lineHeight: FontSize
        palette: PaletteOptions
    }
    interface Theme {
        zoomFontSize: (factor:number) => string
        zoomSpacing: (factor: number) => number
        fontSize: FontSize
        lineHeight: FontSize
        palette: PaletteColor
    }
}

declare module '@material-ui/core/styles/overrides' {
    interface ComponentNameToClassKey {
        MuiAutocomplete: AutoCompleteClassKey
    }
}