import React, { ReactNode, useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, withStyles, Theme, useTheme } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AddIcon from '@material-ui/icons/Add'
import { properCase } from 'helpers/string'
import { Avatar, Size, Shape  } from 'components/avatar/index'
import { Search } from 'components/search'
import Box from 'components/box'
import { ICardList, CardItem, CardItemMetric, GroupedItem, MenuAction } from './index'
import i18nStrings from 'i18n/strings'

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
  last: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  secondColor: {
    // @ts-ignore
    color: theme.palette.neutral.secondColor
  },
  btn: {
    '&:hover': {
      backgroundColor: theme.palette.primary.bg,
      color: theme.palette.text.primary
    }
  },
  firstText: {
    fontSize: theme.fontSize.sm
  },
  secondText: {
    opacity: 0.8,
    fontSize: theme.fontSize.xs
  }
}))

function RenderItem({ item, checkbox, oppSide, metric, size = "sm", shape = "circle", indent, index, secondColor, last }: RenderItemType) {
  const { avatar } = item
  const renderAvatar = avatar ? <Avatar src={avatar.src}
    name={avatar.name}
    size={size}
    shape={shape}
  /> : null
  const styles = useStyles()
  const itemObj: any = item || {}
  itemObj.name = itemObj.name  || avatar.name
  itemObj.subTitle = Array.isArray(itemObj.subTitle)
                ? itemObj.subTitle[0] 
                : itemObj.subTitle ? itemObj.subTitle
                  : avatar.title ? avatar.title : ''
  let cls = "flex items-center w-full "
  cls += index ? " mt-6" : " mt-4 "
  cls += last ? " mb-4" : ""

  return (
    <div className={cls}>
        {renderAvatar}
        <div className="flex flex-col min-w-0 ml-2">
        <div className={`${styles.firstText} leading-none mr-2`}>
            {avatar.name}
          </div>
        <div className={`${styles.secondText} leading-none mt-1`} >
              {itemObj.subTitle}
          </div>
        </div>
    </div>
  )
}

function CardList(props: ICardList) {
  const {
    title='',
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
    showZero = true,
    borderless = false
  } = props
  
  // @ts-ignore
  const dropdowns = null
  const [filterItems, setFilterItems] = useState(items)
  const [searchMode, setSearchMode] = useState(false)
  const emptyArray = items.length === 0
  const grouped = items.length !== 0 && Array.isArray(items[0])
  function handleSearch(str: string) {
    // 
  }
  function handleSearchMode() {
    setSearchMode(!searchMode)
  }
  const placeholder = `Search ${properCase(title)}...`
  const theme = useTheme()
  // @ts-ignore
  const secondColor: string = theme.palette.neutral.secondColor
  const searchCls = searchMode ? "inline-flex w-full" : "inline-flex justify-end" 
  const headerRight =  (
    <div className={searchCls}>
      {search && <Search
        handleSearch={handleSearch}
        placeholder={placeholder}
        toggleSearchMode={()=> handleSearchMode()} />}
      <IconButton className="-ml-2">
        <MoreVertIcon />
      </IconButton>
    </div>
  )
  const cardHeader = (
    <div className="inline-flex items-center justify-between w-full">
      {!searchMode && <div className="text-2xl leading-tight">
        {title}
      </div>}
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
        <RenderItem item={gItem} size={size} shape={shape} checkbox={checkbox} indent={5} index={gIndex} secondColor={secondColor} last={gIndex === groupItem.items.length - 1} />))
      
      const groupCount = groupItems.length
      const groupTitleInfo = groupItem.group
      const groupTitle = groupTitleInfo.title
      return (
        <>
          <div key={index} className="flex items-center mt-6">
            <span className="font-medium text-secondary ml-5">  {groupTitle}&nbsp;({`(${groupCount})`}
            </span>
          </div>
        </>
      )
    }
    else {
      return <RenderItem item={item as CardItem}
        size={size} shape={shape} checkbox={checkbox} metric={metric} index={index} secondColor={secondColor} last={index === items.length - 1}/>
    }
  })
  let cls = "flex-col max-w-xs w-full pl-3  py-4"
  cls += borderless ? "" : " shadow-md"
  return <Box className={cls}>
    {cardHeader}
    {renderItems}
  </Box>
}

export default CardList