import { IAvatar, Size, Shape } from 'components/avatar'

export enum LabelPosition {
  left = 'left',
  right = 'right',
  center = 'center',
}
export type MenuAction = {
  icon?: any
  label: string
  position?: LabelPosition.left | LabelPosition.right
  action?: (val?: any) => void
}

export type Menu = {
  position?: LabelPosition
  menus: MenuAction[]
}

export type BottomButtonAction = {
  label: string
  position?: LabelPosition
  action: (val?: any) => void
}

export type CardMenu = {
  menus?: MenuAction[]
  bottomAction?: BottomButtonAction
}
export enum CardItemMetric {
  ago = 'ago',
  followers = 'followers',
  following = 'following',
  time = 'time',
  date = 'date',
  percentage = 'percentage',
}

export type CardItem = {
  id: string;
  avatar?: IAvatar
  title?: string
  subTitle?: string[] | string
  checked?: boolean
  metric?: number
  format?: string
}
export type GroupedItem = {
  group: CardItem // we will ignore for now all except avatar and title
  items: CardItem[]
  collapsed?: boolean
}

export interface ICardList {
  title: string
  menu?: Menu | MenuAction[]
  bottomAction?: BottomButtonAction[]
  metric?: CardItemMetric
  headerless?: boolean
  color?: any
  borderless?: boolean
  onUpdate?: (val: any) => void
  size?: Size // refers to avatar size
  shape?: Shape // refers to avatar shape
  oppSide?: boolean // avatar or checklist on opposit side
  // rtl => left side avatar/checklist
  // ltl => right side
  tabable?: boolean
  showZero?: boolean // for groups
  items: GroupedItem[] | CardItem[]
  [key: string]: any
  checkable?: boolean
  collapsible?: boolean
  progress?: boolean
}

