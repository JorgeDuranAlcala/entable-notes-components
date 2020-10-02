import React, { ReactElement, useState } from 'react'
import clsx from 'clsx'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import { Palettes } from 'theme/palette'
import Avatar, { IAvatar } from 'components/avatar'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Text from 'components/Text'
import Scrollbar from 'simplebar-react'
import { DARK } from 'theme'
import Tooltip from 'components/tooltip'
import icons from 'icons'
import useStyles from './styles'
import useLayoutStyles from '../styles'

const SpaceShape = "square"
export interface SideItems  {
  avatar?: IAvatar
  title?: string
  top?: any[]
  bottom?: any[]
  mini?: boolean
}

interface Props {
  spaces: any
  collapseSide?: (e:any) => void
  mini?: boolean
}

const getMembers = (space: any) => {
  const { members } = space
  let memberCount: number = 0
  if (!members) {
    return 0
  }
  memberCount += members.owner ? members.owner.length : 0
  memberCount += members.admins ? members.admins.length : 0
  memberCount += members.users ? members.users.length : 0
  memberCount += members.viewers ? members.viewers.length : 0
  return memberCount
}

export const SpaceNode = (space: any) => {
  const members: number = getMembers(space)
  const classes = useStyles()
  const [setCurrentSpace, currentSpace] = useState(null)
  
  const handleClickSpace = (space: any) => {
    alert(`Set path xxx/space/${space.id}`)
  }

  return (
    <li className="flex items-center pv-1"
    onClick={() => handleClickSpace(space)}>
          <Avatar
              name={space.name.toUpperCase()}
              shape="square"
          />
      </li>
  )
}

export const RenderSpaceTree = ({ mini, space, depth = 0 }: any) => {
  const members: number = getMembers(space)
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()
  const theme = useTheme()
  let cls = layoutClasses.sidebar
  cls += mini ? layoutClasses.miniMenu : ''
  cls += ' flex flex-col justify-between'
  const [activeItem, setActiveItem] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const [currentSpace, setCurrentSpace] = useState(null)
  const name = space.name.toUpperCase()
  const { icon, description, spaces } = space
  let src = ""
  let IconComp: any = null
  let isIcon = false

  if (depth > 1) {
    debugger;
  }
  const avatarSize = depth ? 'xs' : 'sm'
  const fontSize = !depth ? 'md' : 'sm'
  const secondFontSize = !depth? 'sm' : 'xs'
  
  if (icon && icons[icon]) {
    if (typeof icons[icon] === 'string') {
      src = icons[icon]
      isIcon = true
    } else {
      IconComp = icons[icon]
    }
  }
  const renderIcon = <Avatar
                      src={src}
                      icon={isIcon}
                      Icon={IconComp}
                      size={avatarSize}
                      border={false}
                      shape={SpaceShape}
                      name={name}
                      pal={Palettes.space}
                      title={description} />

  const even = (depth % 2 === 0)

  const handleClick = () => {
    if (!space.spaces || !space.spaces.length) {
      setCurrentSpace(space)
    } else {
      setOpen(!open)
    }
  }

  const listItemCls = clsx({
    [classes.listItem]: true,
    [classes.activeListItem]: space.active,
    'flex w-full justify-between p-2 items-center': true
  })

  const notOpen = !!(!open &&  spaces &&  spaces.length)
  const expandMore = !even && notOpen && <ExpandMore />
  const expandLess = !even && open && <ExpandLess />
  const nodeInfo =
          (<div className="flex align-center  flex-col">
              <Text
                color={theme.palette.side.main.color}
                fontSize={fontSize}
                className="mt-1 ml-4"
              >
                {name}
              </Text>
              <Text
                color={theme.palette.side.main.color}
                fontSize={secondFontSize}
                opacity="0.8"
                className="ml-6"
              >
              {
                  `${members ? `${members} Team ${members > 1 ? 'Members' : 'Member'}` : `No Members`}`
              }
              </Text>
            </div>)
  const children = open &&
    <li className="flex flex-col space-between">
      {(spaces).map((cspace: any, cindex: number) => {
        return (<RenderSpaceTree key={cindex} mini={mini} space={cspace} depth={depth + 1} />)
      })}
    </li>
  const items =  (
    <li
      className={listItemCls}
      onClick={handleClick}
    >
      {!even ? renderIcon : null}
      {!mini && nodeInfo}
      {even ? renderIcon : null}
      {expandLess}
      {expandMore}
    </li>
  )
  return (children ? (<div className="flex flex-col">{items}{children}</div>) : items )
  
  /*
  return (
   <ListItem
    key={space.title}
    activeClassName={space.active ? classes.activeListItem : ''}
    className={`${classes.listItem} `}
    component="li"
      to={space.href}
      onClick={handleClick}
    >
      {!even ? renderIcon : null}
      {!mini && <ListItemText
        classes={{ primary: classes.listItemText }}
        primary={space.title}
      />}
      {even
        ? renderIcon :
          open
          ? <ExpandLess />
          : <ExpandMore />}
      {open }
    </ListItem> 
    )
  */
}

function SideBar({ spaces }: Props): ReactElement {
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()
  const [mini, setMini] = useState(false)
  const children = spaces.spaces
  let cls = layoutClasses.sidebar + ' '
  cls += mini ? layoutClasses.mini : layoutClasses.fullMenu
  debugger
  cls += ' flex flex-col justify-between'

  function toggleMini() {
    setMini(!mini)
  }

  return (
    <div className={cls}>
      <List component="nav" disablePadding>
        {(children || []).map((space: any, index: number) => <RenderSpaceTree key={index} mini={mini} space={space} />)}
      </List>
     
        <List component="nav" disablePadding className="flex justify-center align-center">
        {setMini && <ListItemIcon className={classes.listItemIcon} onClick={toggleMini}>
          <ArrowBack />
        </ListItemIcon>}
        <Fab size="small" color="secondary" aria-label="add"
          className={classes.margin}>
            <AddIcon />
        </Fab>
        </List>
    </div>
  )
}

export default SideBar