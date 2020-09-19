import styles from './styles'
import React, { useState, useContext, ReactElement, ReactNode } from 'react'
import clsx from 'clsx'

import { Badge, Toolbar, IconButton, AppBar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import InputIcon from '@material-ui/icons/Input'
import useStyles from './styles'
import useLayoutStyles from '../styles'
import { ThemeToggler }  from 'components'
import LayoutContext from "context/layout-context"
// Component styles

interface Props  {
    className?: string;
    headerContent?: any
}

function Header({ className, headerContent ={}}: Props): ReactElement {
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()
  const { right = null, left = null, center = null } = headerContent
  
  return (
    <AppBar position="relative" className={clsx(classes.root, layoutClasses.header, 'flex items-center',className&&className)}>
      <Toolbar className={`w-full pl-0 flex items-center` }>
        {left}
        {center}
        {right}
    </Toolbar>
    </AppBar>
  )
}

export default Header

