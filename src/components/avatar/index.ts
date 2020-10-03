import React, { ReactNode } from 'react'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon'
import Avatar, { valToAvatars } from './Avatar'
import { Palettes } from 'theme/palette'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Shape = 'square' | 'circle' | 'square'
export type Status = 'away' | 'online' | 'inactive' | 'busy'

export interface IAvatar {
  src?: string
  name?: string
  title?: string
  tooltip?: boolean
  online?: Status
  lastSeen?: number
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>
  size?: Size
  shape?: Shape
  border?: boolean
  trans?: boolean
  className?: string
  style?: any
  children?: ReactNode
  component?: any
  custom?: boolean
  extra?: boolean
  color?: string
  initials?: number
  icon?: boolean
  pal?: Palettes
  cStyle?: any
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> | null
  handleClick?: (e: any) => void
}

export default Avatar
export { Avatar, valToAvatars }
