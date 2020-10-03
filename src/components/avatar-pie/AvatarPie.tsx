import React from 'react'
import clsx from 'clsx'
import { WithStyles, withStyles, Theme } from '@material-ui/core/styles'
import TooltipList from '../tooltip/TooltipList'

import { roundNum } from 'helpers'
import { GlobalContext } from 'context'
import Avatar, { Size, IAvatar } from 'components/avatar'

function getSize(siz: Size, half?: boolean) {
  const { zoomSpacing } = GlobalContext.theme
  let idx = ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(siz)
  if (idx === -1) {
    idx = 2
  }
  const spacing = zoomSpacing(idx + 2)
  return half ? roundNum(Number(spacing.split('rem')[0]) / 2) + 'rem' : spacing
}

function getBorderAndMargin(size: Size) {
  const { palette } = GlobalContext.theme
  return {
    borderColor: palette.background.default,
    margin: {
      marginTop: '0.3rem',
      marginLeft: '0.3rem',
    },
    plusMargin: {
      marginTop: '0.1rem',
      marginLeft: '0.6rem',
    },
  }
}

const styles = (theme: Theme): any => {
  const { palette, shape, typography } = theme
  const color = palette.type === 'light' ? palette.grey[400] : palette.grey['A700']
  const def = palette.background.default

  return {
    /* Styles applied to the root element if not `src` or `srcSet`. */
    colorDefault: {
      color: def,
      backgroundColor: color,
    },

    border: {
      border: `1px solid ${def}`,
      borderRadius: '50%',
    },
    borderRight: {
      borderRight: `1px solid ${def}`,
    },
    borderTop: {
      borderTop: `1px solid ${def}`,
    },
  }
}

export interface StyleProps extends WithStyles<typeof styles> {}
const border = '1px solid'
const borderRadius = 99
const groupGrid = [
  [{ gridColumnStart: 1, gridColumnEnd: 1, gridRowStart: 1, gridRowEnd: 1, borderRadius: borderRadius }],
  [
    {
      gridColumnStart: 1,
      gridColumnEnd: 1,
      gridRowStart: 1,
      gridRowEnd: 1,
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      borderRight: border,
    },
    {
      gridColumnStart: 2,
      gridColumnEnd: 2,
      gridRowStart: 1,
      gridRowEnd: 1,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    },
  ],
  [
    {
      gridColumnStart: 1,
      gridColumnEnd: 1,
      gridRowStart: 1,
      gridRowEnd: 1,
      borderTopLeftRadius: borderRadius,
      borderRight: border,
    },
    { gridColumnStart: 2, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 1, borderTopRightRadius: borderRadius },
    {
      gridColumnStart: 1,
      gridColumnEnd: 3,
      gridRowStart: 2,
      gridRowEnd: 2,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      borderTop: border,
    },
  ],
]

export interface IProps extends StyleProps {
  avatars: IAvatar[]
  outline?: boolean
  size?: Size
}

function AvatarPie(props: IProps) {
  const { classes, size = 'md', outline = true } = props
  const len = props.avatars.length
  const avatars = len <= 3 ? props.avatars : [...props.avatars.slice(0, 2), { name: `+ ${len - 2}`, src: '' }]
  const isPlus = len > 3
  const { fontSize } = GlobalContext.theme
  const avatarGrid = groupGrid[avatars.length - 1]
  const columnWidth = len > 1 ? getSize(size, true) : getSize(size)
  const columnHeight = len > 2 ? getSize(size, true) : getSize(size)
  const outlineCls = outline ? classes.border : ''
  const borderAndMargin = getBorderAndMargin(size)
  const { borderColor, margin, plusMargin } = borderAndMargin
  console.log('fontSize', fontSize.md)
  return (
    <TooltipList title="Users" content={props.avatars.map(avatar => avatar.name) as string[]}>
      <div
        className={clsx('inline-grid grid-flow-col text-black', outlineCls)}
        style={{
          gridAutoColumns: columnWidth,
          overflow: 'hidden',
          height: getSize(size).split('rem')[0] * 1.06 + 'rem',
        }}
      >
        {avatars.map((avatar, idx) => {
          const { src, name } = avatar
          if (len === 1) {
            return <Avatar src={src} name={name} size="md" />
          }
          const grid = avatarGrid[idx]
          const initials = isPlus && idx === 2 ? 2 : 1
          const cStyle = isPlus && idx === 2 ? plusMargin : margin
          const avatarStyle = idx === 2 ? { height: getSize(size) } : { height: columnHeight }
          return (
            <Avatar
              style={{ ...grid, ...avatarStyle, fontSize: fontSize.sm, borderColor }}
              src={avatar.src}
              name={avatar.name}
              size="md"
              initials={initials}
              custom={true}
              cStyle={{ ...cStyle }}
            />
          )
        })}
      </div>
    </TooltipList>
  )
}

export default withStyles(styles)(AvatarPie)
