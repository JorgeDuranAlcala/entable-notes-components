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
  const notOpen = !!(!open && spaces && spaces.length)

  const handleClick = () => {
    if (!space.spaces || !space.spaces.length) {
      setCurrentSpace(space)
    } else {
      setOpen(!open)
    }
  }
  const avatarSize = depth ? 'xs' : 'sm'
  const fontSize = !depth ? 'md' : 'sm'
  const secondFontSize = !depth? 'sm' : 'xs'
  
  let src = ""
  let IconComp: any = null
  let isIcon = false 
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
  const listItemCls = clsx({
    [classes.listItem]: true,
    [classes.activeListItem]: space.active,
    'flex w-full items-center cursor-pointer': true,
    'pl-4': depth && mini,
    'pl-8': depth &&  !mini,
    'px-2': !depth,
    'justify-between': !mini,
    'justify-center flex-col mt-4': mini
  })

  const children = open &&
  <List component="nav" className="flex flex-col space-between">
    {(spaces).map((cspace: any, cindex: number) => {
      return (<RenderSpaceTree key={cindex} mini={mini} space={cspace} depth={depth + 1} />)
    })}
  </List>

  if (mini) {
    return (
      <div className="flex flex-col">
        <li
          className={listItemCls}
          onClick={handleClick}>
          {renderIcon}
        </li>
        {children}
      </div>
    )
  }

  const textCls = clsx({
    'flex justify-end mr-4': !even,
    'ml-4': even
  })
  const nodeCls = clsx({
    'flex align-center flex-col': true,
    'pl-8': depth > 0
  })
  const expandMore = !even && notOpen && <ExpandMore />
  const expandLess = !even && open && <ExpandLess />
  const nodeInfo =
          (<div className={nodeCls}>
              <Text
                color={theme.palette.side.main.color}
                fontSize={fontSize}
                className={textCls}
              >
                {name}
              </Text>
              <Text
                color={theme.palette.side.main.color}
                fontSize={secondFontSize}
                opacity="0.8"
                className={textCls}
              >
              {
                  `${members ? `${members} Team ${members > 1 ? 'Members' : 'Member'}` : `No Members`}`
              }
              </Text>
            </div>)
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
  
}

function SideBar({ spaces }: Props): ReactElement {
  const classes = useStyles()
  const layoutClasses = useLayoutStyles()
  const [mini, setMini] = useState(false)
  const children = spaces.spaces
  const nCls = clsx({
    [layoutClasses.sidebar]: true,
    [layoutClasses.mini]: mini,
    [layoutClasses.fullMenu]: !mini,
    ' flex flex-col justify-between': true
  })
  const bCls = clsx({
    "flex flex-col justify-between py-2": true,
    "items-end m-4": !mini,
    "items-center": mini
  })

  function toggleMini() {
    setMini(!mini)
  }

  return (
    <div className={nCls}>
      <List className={layoutClasses.scrollBar} component="nav" disablePadding>
        {(children || []).map((space: any, index: number) => <RenderSpaceTree key={index} mini={mini} space={space} />)}
      </List>
        <List component="nav" disablePadding className={bCls}>
        {setMini && <ListItemIcon component="li" className={"p-4"} >
          <ArrowBack className={"cursor-pointer"} onClick={toggleMini}/>
        </ListItemIcon>}
        <Fab size="small" color="secondary" aria-label="add"
          className="mt-2">
            <AddIcon />
        </Fab>
        </List>
    </div>
  )
}

export default SideBar