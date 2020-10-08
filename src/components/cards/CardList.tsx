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
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { move as moveArrayEl, removeFromArrayAtPosition as removeEl } from "helpers/array"
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';

type RenderItemType = {
  item: CardItem
  checkbox?: boolean
  oppSide?: boolean
  metric?: CardItemMetric
  size?: Size
  shape?: Shape
  indent?: number
  secondColor: string
  index: number
  last: boolean,
  moveable?: boolean;
  onDeleteItem?: (index: number) => void; 
}

const useStyles = makeStyles((theme: Theme) => ({
  secondColor: {
    // @ts-ignore
    color: theme.palette.neutral.secondColor,
  },
  btn: {
    '&:hover': {
      backgroundColor: theme.palette.primary.bg,
      color: theme.palette.text.primary,
    },
  },
  firstText: {
    fontSize: theme.fontSize.sm,
  },
  secondText: {
    opacity: 0.8,
    fontSize: theme.fontSize.xs,
  },
}))

function RenderItem({
  item,
  checkbox,
  oppSide,
  metric,
  size = 'sm',
  shape = 'circle',
  indent,
  index,
  secondColor,
  last,
  moveable,
  onDeleteItem
}: RenderItemType) {
  const { avatar } = item
  const renderAvatar = avatar ? <Avatar src={avatar.src} name={avatar.name} size={size} shape={shape} /> : null
  const styles = useStyles()
  const itemObj: any = item || {}
  itemObj.name = itemObj.name || avatar?.name
  itemObj.subTitle = Array.isArray(itemObj.subTitle)
    ? itemObj.subTitle[0]
    : itemObj.subTitle[0]
    ? itemObj.subTitle
    : itemObj.subTitle
    ? avatar?.title
    : avatar?.title
  let cls = 'flex items-center w-full '
  cls += index ? ' mt-6' : ' mt-4 '
  cls += last ? ' mb-4' : ''
  const [ShowIcon, setShowIcon] = useState(false)
  
  const innerContent = (
    <React.Fragment>
      {renderAvatar}
      <div className="flex flex-col min-w-0 ml-2 pl-3  w-full" >
        <div className={`${styles.firstText} leading-none mr-2`}>{avatar?.name}</div>
        <div className={`${styles.secondText} leading-none mt-1`}>{itemObj.subTitle}</div>
      </div>
    </React.Fragment>
  )
  return (!moveable ? (
    <div className={cls}>
      {innerContent}
    </div>) : (
      <Draggable draggableId={`cardItem-${index}`} index={index} isDragDisabled={!moveable}  >
            {
              (provided, snapshot) => (
                <div className={cls}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  onMouseOver={() => setShowIcon(!ShowIcon)}
                  onMouseOut={() => setShowIcon(false)}
                >
                  {innerContent}
                  <div className="flex items-center mr-4" >
                    { ShowIcon && moveable && <DragIndicatorIcon style={{transition: 'all .5s ease-in-out'}} /> }
                    { snapshot.isDragging && <DragIndicatorIcon />}
                    { moveable && <DeleteIcon onClick={() => onDeleteItem && onDeleteItem(index)}  /> }
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
    size,
    shape,
    menu = [],
    bottomAction = [],
    metric,
    checkbox,
    items = [],
    search,
    add,
    onAdd,
    moveable,
    showZero = true,
    borderless = false,
  } = props

  const [filterItems, setFilterItems] = useState(items)
  const [searchMode, setSearchMode] = useState(false)
  const [move, setMove] = useState(false)
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
  const secondColor: string = theme.palette.primary.contrastText
  const searchCls = searchMode ? 'inline-flex w-full' : 'inline-flex justify-end'
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
      {!searchMode && <div className="text-2xl leading-tight">{title}</div>}
      {headerRight}
    </div>
  )

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
          checkbox={checkbox}
          indent={5}
          index={gIndex}
          secondColor={secondColor}
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
          checkbox={checkbox}
          metric={metric}
          index={index}
          secondColor={secondColor}
          moveable={move}
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
    <Box className={cls} >
      {cardHeader}
          <DragDropContext onDragEnd={onDragEnd} >
            <Droppable droppableId="card-list">
              {
                (provided) => (
                  <ul className="flex flex-col items-center w-full " 
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {renderItems}
                    {provided.placeholder}
                  </ul>
                )
              }
            </Droppable>
        </DragDropContext>
      <div className="mt-2">
        { !move && moveable && filterItems  && <Button variant="contained" color="secondary" onClick={() => setMove(!move)}>Move Cards</Button>}
      </div>
      {
        move && filterItems.length > 0 && (<div className="inline-flex justify-between w-full mt-4 pr-4" >
            <Button variant="contained" color="primary"  onClick={() => setMove(!move) }>Save</Button>
            <Button variant="contained" color="default" onClick={() => {setMove(false);setFilterItems(items)}}>Cancel</Button>
          </div>)
      }
    </Box>
  )
}

export default CardList
