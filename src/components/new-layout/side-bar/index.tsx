import React, { ReactElement, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { IAvatar } from 'components/avatar'
import { Profile, ProjectsNav } from 'components'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { DARK } from 'theme'
import { GlobalContext } from 'context'
import useStyles from './styles'
import useLayoutStyles from '../styles'

export interface SideItems  {
  avatar?: IAvatar
  title?: string
  top?: any[]
  bottom?: any[]
  mini?: boolean
}

interface Props {
  onToggle?: (e: any) => void
  items?: SideItems
  collapsible?: boolean
  mini?: boolean
}

function SideBar({mini=false, onToggle, collapsible = true, items={}}: Props): ReactElement {
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()
  const { palette } = GlobalContext
  const { type } = palette
  let cls = layoutClasses.sidebar
  cls+= mini ? layoutClasses.miniMenu : ''
  const [activeItem, setActiveItem] = useState<any>(null)
  
  return (
    <OverlayScrollbarsComponent className={`${cls} flex overflow-auto ${type === DARK ? 'os-theme-light' : 'os-theme-dark'}`}>
      <div className={classes.listItem}>
        <Profile className={classes.profile} /> 
        <ProjectsNav />
        <List component="div" disablePadding>
          {(items.top || []).map(item => (
            <ListItem
            key={item.title}
            activeClassName={item.active ? classes.activeListItem: ''}
            className={classes.listItem}
            component={NavLink}
              to={item.href}
              >
              <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary={item.title}
                />
            </ListItem>
          ))}
        </List>
        {collapsible &&
          <List  className={classes.bottom}>
            <ListItemIcon className={classes.listItemIcon}>
              <ArrowBack/>
            </ListItemIcon>
          </List>}
        </div>
    </OverlayScrollbarsComponent>
  )
}

export default SideBar