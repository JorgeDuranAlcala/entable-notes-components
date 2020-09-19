import React, { useContext } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles'

import { Theme} from '@material-ui/core/styles/createMuiTheme';
import createTheme from './theme'
import ThemeContext from './theme-context'

export default function ThemeProvider(props: any) {
  const { children } = props
  const { themeZoom } = useContext(ThemeContext)
  const theme:any = createTheme(themeZoom)
  return (<MuiThemeProvider 
            theme={theme}> 
            {children}
          </MuiThemeProvider>)
}
