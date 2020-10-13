import React, { ReactNode, useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, withStyles, Theme, useTheme } from '@material-ui/core/styles'
import { Button, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AddIcon from '@material-ui/icons/Add'
import { properCase } from 'helpers/string'
import { Avatar, Size, Shape } from 'components/avatar/index'
import { Search } from 'components/search'
import Box from 'components/box'
import { ICardList, CardItem, CardItemMetric, GroupedItem, MenuAction } from './index'
import i18nStrings from 'i18n/strings'

import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { move as moveArrayEl, removeFromArrayAtPosition as removeEl } from "helpers/array"
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';
import ProgressBar from 'components/progressbar'

type RenderItemType = {
  item: CardItem
  checkbox?: boolean
  oppSide?: boolean
  metric?: CardItemMetric
  size?: Size
  shape?: Shape
  indent?: number
  index: number
  last: boolean
  onDeleteItem?: (index: number) => void;
  color?: any
  moveable?: boolean
  checkable?: boolean
}

// @ts-ignore
const useStyles = makeStyles((theme: Theme, props: any) => ({
  firstText: {
    fontSize: theme.fontSize.md,
  },
  secondText: {
    opacity: 0.8,
    fontSize: theme.fontSize.sm,
  },
}))

function RenderItem({
  item,
  oppSide,
  metric,
  size = 'sm',
  shape = 'circle',
  indent,
  index,
  last,
  moveable,
  onDeleteItem,
  color = "primary",
  checkable
}: RenderItemType) {
  const { avatar } = item
  const renderAvatar = avatar ? <Avatar src={avatar.src} name={avatar.name} size={size} shape={shape} /> : null
  const styles = useStyles()
  const itemObj: any = item || {}
  itemObj.subTitle = itemObj.subTitle ? Array.isArray(itemObj.subTitle)
    ? itemObj.subTitle[0]
    : itemObj.subTitle
  : ''
  let cls = 'flex items-center w-full'
  cls += avatar ? index ? ' mt-2 ' : ' mt-6 ': index ? '' : ' mt-6 '
  cls += last ? ' mb-4' : ''
  const [showIcon, setShowIcon] = useState(false)
  const [checked, setChecked] = useState(!!itemObj.checked)
  
  const toggleItemCheck = ((item: any) => {
    setChecked(!checked)
    item.checked = item.checked ? 0 : Date.now()
  })
  
  const checkItem = checkable && (<Checkbox checked={checked} onChange={toggleItemCheck}   color={color}  />)
  const firstTextCls = `${styles.firstText} leading-none mr-2 ` + (checkable && checked ? ' line-through' : '')
  const innerContent = (
    <React.Fragment>
      {checkItem}
      {renderAvatar}
      <div className="flex flex-col min-w-0 ml-2 w-full" >
        <div className={firstTextCls}>{itemObj.title}</div>
        {itemObj.subTitle && (<div className={`${styles.secondText} leading-none mt-1`}>{itemObj.subTitle}</div>)}
      </div>
    </React.Fragment>
  )

  return (!moveable ? (
    <div className={cls}>
     {innerContent}
    </div>) : (
      <Draggable draggableId={`cardItem-${index}`} index={index} isDragDisabled={!moveable} key={index}  >
            {
              (provided, snapshot) => (
                <div className={cls}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  onMouseOver={() => setShowIcon(true)}
                  onMouseOut={() => setShowIcon(false)}
                >
                   {innerContent}
                  <div className="flex items-center mr-4" >
                    { showIcon && moveable && <DragIndicatorIcon /> }
                    { snapshot.isDragging && <DragIndicatorIcon />}
                    { moveable && (
                        <button className={`${!showIcon && "hidden"}`} onClick={() => onDeleteItem && onDeleteItem(index)}>
                         <DeleteIcon />
                        </button> 
                      )
                    }
                  </div>
                </div>
              )
            }
    </Draggable>
  ))
}

function CardList(props: ICardList) {
  const {
    title = '',
    size='sm',
    shape,
    headerless = false,
    menu = [],
    bottomAction = [],
    metric,
    items = [],
    search,
    add,
    onAdd,
    moveable,
    showZero = true,
    borderless = false,
    checkable = false,
    progress = false
  } = props

  const [filterItems, setFilterItems] = useState(items)
  const [searchMode, setSearchMode] = useState(false)
  const sm = size === 'sm'

  function handleSearch(str: string) {
    //
  }
  function handleSearchMode() {
    setSearchMode(!searchMode)
  }

  function onDeleteItem(index: number) {
      const newArray = removeEl(filterItems, index)
      setFilterItems(newArray)
  }

  const placeholder = `Search ${properCase(title)}...`
  const theme = useTheme()
  let searchCls = searchMode ? 'inline-flex w-full' : 'inline-flex justify-end'
  searchCls += headerless ? ' w-full' : ''
  const headerRight = (
    <div className={searchCls}>
      {search && (
        <Search handleSearch={handleSearch} placeholder={placeholder} toggleSearchMode={() => handleSearchMode()} />
      )}
      <IconButton className="-ml-2">
        <MoreVertIcon />
      </IconButton>
    </div>
  )

  const cardHeader = (
    <div className="inline-flex items-center justify-between w-full">
      {!searchMode && !headerless && <div className="text-2xl leading-tight">{title}</div>}
      {headerRight}
    </div>
  )

  const totalCount = progress && checkable ? filterItems.length : 0
  // @ts-ignore
  const checkedCount = totalCount ? filterItems.reduce(((count, item) => count + (item.checked ? 1 : 0))
  , 0) : 0
  // @ts-ignore
  const renderItems = filterItems.map((item: GroupedItem | CardItem, index: number) => {
    // @ts-ignore
    if (item.group) {
      const groupItem = item as GroupedItem
      if ((!groupItem.items || !groupItem.items.length) && !showZero) {
        return null
      }
      const groupItems = groupItem.items.map((gItem: CardItem, gIndex: number) => (
        <RenderItem
          item={gItem}
          size={size}
          shape={shape}
          indent={5}
          index={gIndex}
          checkable={checkable}
          last={gIndex === groupItem.items.length - 1}
          onDeleteItem={onDeleteItem}
        />
      ))

      const groupCount = groupItems.length
      const groupTitleInfo = groupItem.group
      const groupTitle = groupTitleInfo.title
      return (
        <>
          <div key={index} className="flex items-center mt-6">
            <span className="font-medium text-secondary ml-5">
              {' '}
              {groupTitle}&nbsp;({`(${groupCount})`}
            </span>
          </div>
        </>
      )
    } else {
      return (
        <RenderItem
          item={item as CardItem}
          size={size}
          shape={shape}
          checkable={checkable}
          metric={metric}
          index={index}
          moveable={moveable}
          last={index === items.length - 1}
          onDeleteItem={onDeleteItem}
        />
      )
    }
  })

  let cls = 'flex-col max-w-xs w-full pl-3  py-4'
  cls += borderless ? '' : ' shadow-md'

  function onDragEnd(result: DropResult) {
    if (!result)
      return
    setFilterItems(moveArrayEl([...filterItems], result.source.index, result.destination?.index))
  }

  return (
    <Box className={cls}>
      {cardHeader}
      {totalCount && <ProgressBar width="80%" value={Math.round(checkedCount/totalCount * 100)} align="left" top={true} height={sm ? 6 : undefined} title={headerless ? title : ''} className="-ml-20 -mt-4"/>}
      {moveable ? (
        <DragDropContext onDragEnd={onDragEnd} >
          <Droppable droppableId="card-list">
            {
              (provided) => (
                <ul className="flex flex-col items-center w-full" 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {renderItems}
                  {provided.placeholder}
                </ul>
              )
            }
          </Droppable>
        </DragDropContext>) : renderItems}
    </Box>
  )
}

export default CardList
