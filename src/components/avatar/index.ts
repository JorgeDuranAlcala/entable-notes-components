import React, { ReactNode } from 'react'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon'
import Avatar, { valToAvatars } from './Avatar'
import { Palettes } from 'theme/palette'
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Shape = 'square' | 'circle' | 'square'
export enum Status  {
  online = 'Online',
  away = 'Away',
  inactive = 'Inactive',
  busy = 'Busy'
}
export interface IAvatar {
  src?: string
  name?: string
  title?: string
  tooltip?: boolean
  online?: Status
  pal?: Palettes
  lastSeen?: number
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>
  size?: Size
  shape?: Shape
  border?: boolean
  className?: string
  style?: object
  children?: ReactNode
  component?: any
  custom?: boolean
  extra?: boolean
  initials?: number
  cStyle?: object
  Icon?:  OverridableComponent<SvgIconTypeMap<{}, "svg">> | null
  handleClick?: (e:any) => void
}

export default Avatar
export { Avatar, valToAvatars }