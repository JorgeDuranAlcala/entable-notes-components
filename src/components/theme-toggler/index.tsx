import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PaletteIcon from '@material-ui/icons/Palette'
import { Tooltip } from '@material-ui/core'
import { ThemeType } from 'theme'
import GlobalContext from 'context/global-context'
import { ThemeContext, AVAILABLE_THEMES } from 'theme'

export default function ThemeToggler({ className }: any) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { themeZoom, setThemeZoom } = React.useContext(ThemeContext)
  const [theme, setTheme] = React.useState<ThemeType>(GlobalContext.themeZoom.theme)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const onChangeTheme = (theme: ThemeType) => {
    const { zoom } = themeZoom
    setThemeZoom({ theme, zoom })
    setTheme(theme)
    setAnchorEl(null)
  }

  return (
    <div className={className}>
      <Tooltip title="Change Theme">
        <IconButton aria-label="theme-palette" aria-controls="theme-menu" aria-haspopup="true" onClick={handleClick}>
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="theme-toggler"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => onChangeTheme(theme)}
      >
        {AVAILABLE_THEMES.map(option => (
          <MenuItem key={option} selected={option === theme} onClick={() => onChangeTheme(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

ThemeToggler.propTypes = {
  className: PropTypes.string,
}
