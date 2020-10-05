import React, { ReactElement, useState, useRef } from 'react'
import clsx from 'clsx'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { List, ListItemIcon } from '@material-ui/core'
import { Popover } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { Palettes } from 'theme/palette'
import Avatar, { IAvatar } from 'components/avatar'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Text from 'components/text'
import { DARK } from 'theme'
import Tooltip from 'components/tooltip'
import icons from 'icons'
import useStyles from './styles'
import useLayoutStyles from '../styles'

const SpaceShape = 'square'
export interface SideItems {
  avatar?: IAvatar
  title?: string
  top?: any[]
  bottom?: any[]
  mini?: boolean
}

interface Props {
  spaces: any
  collapseSide?: (e: any) => void
  mini?: boolean
  RightBar?: React.ReactElement
}

let RightBarList: React.ReactElement
let popoverContent: any = null
let popoverRendered: boolean = false
let classes: any = null
let layoutClasses: any = null
let side: any = null
let activeItem: any = null

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

function setActiveItem(item: any) {
  activeItem = item
}

function PopOverMenu(props: any) {
  const { handlePopoverClose, anchorEl, children } = props
  const open = Boolean(anchorEl)
  const id = open ? 'sidebar-right-menu' : undefined
  const [isOpen, setIsOpen] = useState(true)

  function closePopover(e:any) {
    setIsOpen(false)
    handlePopoverClose(e)
  }

  return (isOpen ? (
      <ClickAwayListener onClickAway={handlePopoverClose}>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={closePopover}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
          }}
          transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
          }}
          >
          {children}
        </Popover>
      </ClickAwayListener>
  ): null)
}

export const RenderTree = ({ mini = false, space, depth = 0, isOpen=false, active }: any) => {
  const members: number = getMembers(space)
  const [open, setOpen] = useState(isOpen)
  const [currentSpace, setCurrentSpace] = useState(null)

  const ref = useRef(null)
  const name = space.name.toUpperCase()
  const { icon, description, spaces } = space
  const notOpen = !!(!open && spaces && spaces.length)
  const menuColor = side.color

  const handlePopoverClose = (e: any) => {
    debugger
    setOpen(false)
    setActiveItem(null)
    popoverContent = null
  }

  function miniMenu(el:any) {
    const { sidebar, scrollBar } = layoutClasses
    const anchorEl = el
    const cls = clsx({
      [sidebar]: true,
      [scrollBar]: true,
      'h-auto, py-2': true
    })

    const innerContent = (
      <nav className={cls} style={{height: 'auto'}}>
        <RenderTree mini={false} space={space} depth={0} isOpen={true}/>
      </nav>
    )
    popoverContent =
        (<PopOverMenu
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
        >
          {innerContent}
        </PopOverMenu>)
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(ref)
    if (!space.spaces || !space.spaces.length) {
      setCurrentSpace(space)
      setActiveItem(ref.current)
    } else {
      if (open) {
        setActiveItem(null)
      } else {
        setActiveItem(ref.current)
      }
      if (mini && !open) {
        if (!popoverContent) {
          miniMenu(e.currentTarget)
        }
      }
      setOpen(!open)
    }
  }
 
  const avatarSize = depth ? 'xs' : 'sm'
  const fontSize = !depth ? 'md' : 'sm'
  const secondFontSize = !depth ? 'sm' : 'xs'

  let src = ''
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

  const renderIcon = (
    <Avatar
      src={src}
      icon={isIcon}
      Icon={IconComp}
      size={avatarSize}
      border={false}
      shape={SpaceShape}
      name={name}
      pal={Palettes.space}
      title={description}
    />
  )

  const even = depth % 2 === 0
  const listItemCls = clsx({
    [classes.listItem]: true,
    [classes.activeListItem]: active && ref.current && active === ref.current,
    'flex w-full items-center cursor-pointer': true,
    'pl-4': depth && mini,
    'pl-8': depth && !mini,
    'px-2': !depth,
    'justify-between': !mini,
    'justify-center flex-col mt-4': mini,
  })

  const children = open && !mini &&  (
    <nav className="flex flex-col space-between">
      {spaces.map((cspace: any, cindex: number) => {
        return <RenderTree key={cindex} mini={mini} space={cspace} active={activeItem} depth={depth + 1} />
      })}
    </nav>
  )

  if (mini) {
    return (
        <React.Fragment>
          <div className="flex flex-col">
            <li className={listItemCls} onClick={handleClick}>
              {renderIcon}
            </li>
            {children &&  children}
          </div>
          {open && popoverContent}
        </React.Fragment>
    )
  }
  const textCls = clsx({
    'flex justify-end mr-4': !even,
    'ml-4': even,
  })
  const nodeCls = clsx({
    'flex align-center flex-col': true,
    'pl-8': depth > 0,
  })
  const expandMore = !even && notOpen && <ExpandMore />
  const expandLess = !even && open && <ExpandLess />
  const nodeInfo = (
    <div className={nodeCls}>
      <Text color={menuColor} fontSize={fontSize} className={textCls}>
        {name}
      </Text>
      <Text color={menuColor} fontSize={secondFontSize} opacity="0.8" className={textCls}>
        {`${members ? `${members} Team ${members > 1 ? 'Members' : 'Member'}` : `No Members`}`}
      </Text>
    </div>
  )
  const items = (
    <li ref={ref} className={listItemCls} onClick={handleClick}>
      {!even ? renderIcon : null}
      {!mini && nodeInfo}
      {even ? renderIcon : null}
      {expandLess}
      {expandMore}
    </li>
  )

  return children ? (
    <div className="flex flex-col">
      {items}
      {children}
    </div>
  ) : (
    items
  )
}

function SideBarInner({ spaces }: Props): ReactElement {
  const [mini, setMini] = useState(false)
  const children = spaces.spaces
  const nCls = clsx({
    [layoutClasses.sidebar]: true,
    [layoutClasses.mini]: mini,
    [layoutClasses.fullMenu]: !mini,
    ' flex flex-col justify-between': true,
  })
  const bCls = clsx({
    'flex flex-col justify-between py-2': true,
    'items-end m-4': !mini,
    'items-center': mini,
  })
  
  function toggleMini() {
    setMini(!mini)
  }

  return (
    <div className={nCls}>
      <List className={layoutClasses.scrollBar} component="nav" disablePadding>
        {(children || []).map((space: any, index: number) => (
          <RenderTree key={index}
            mini={mini}
            space={space}
            active={activeItem}
          />
        ))}
      </List>
      <List component="nav" disablePadding className={bCls}>
        {setMini && (
          <ListItemIcon className={'p-4'}>
            <ArrowBack className={'cursor-pointer'} onClick={toggleMini} />
          </ListItemIcon>
        )}
        <Fab size="small" color="secondary" aria-label="add" className="mt-2">
          <AddIcon />
        </Fab>
      </List>
    </div>
  )
}

function SideBar({ spaces, RightBar }: Props): ReactElement {
  if (RightBar) {
    RightBarList = RightBar
  }
  const theme = useTheme()
  side = theme.palette.side
  classes = useStyles()
  layoutClasses = useLayoutStyles()

  return (<SideBarInner spaces={spaces} />)
}

export default SideBar