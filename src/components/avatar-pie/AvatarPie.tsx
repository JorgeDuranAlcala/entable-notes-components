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
  console.log('spacing', spacing);
  return half ? roundNum(Number(spacing.split('rem')[0]) / 2) + 'rem' : spacing
}

function getBorderAndMargin(size: Size) {
  const { palette } = GlobalContext.theme
  return {
    borderColor: palette.background.default,
    margin: {},
    plusMargin: {},
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
    { 
        gridColumnStart: 2,
        gridColumnEnd: 2,
        gridRowStart: 1,
        gridRowEnd: 1,
        borderTopRightRadius: borderRadius,
    },
    {
      gridRowStart: 2,
      gridColumnStart: 1,
      gridRowEnd: 2,
      gridColumnEnd: 3,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      borderTop: border,
    },
  ],
]

const lineHeight = {
    xs: [{
        lineHeight: '0.75rem',
        paddingLeft: '0.125rem'
    },{
        lineHeight: '0.75rem',
    },{
        lineHeight: '0.6rem',
        textAlign: 'center'
    }],

    sm: [{
        lineHeight: '1rem',
        paddingLeft: '0.2rem'
    },{
        lineHeight: '1rem',
        paddingLeft: '0.1rem'
    },{
        lineHeight: '0.8125rem',
        textAlign: 'center'
    }],

    md: [{
        lineHeight: '1.4rem',
        paddingLeft: '0.5rem'
    },{
        lineHeight: '1.4rem',
        paddingLeft: '0.2rem'
    },{
        paddingTop: '0.0175rem',
        textAlign: 'center'
    }],

    lg: [{
        lineHeight: '1.75rem',
        paddingLeft: '0.6rem'
    },{
        lineHeight: '1.75rem',
        paddingLeft: '0.3rem'
    },{
        lineHeight: '1.5rem',
        textAlign: 'center'
    }],

    xl: [{
        lineHeight: '1.85rem',
        paddingLeft: '0.8rem'
    },{
        lineHeight: '1.85rem',
        paddingLeft: '0.5rem'
    },{
        lineHeight: '1.7rem',
        textAlign: 'center'
    }]
}

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
          const nameStyle =  lineHeight[size] && !src ? lineHeight[size][idx] : {};
          
          return (
            <Avatar
              style={{ ...grid, ...avatarStyle, fontSize: fontSize.sm, borderColor,  ...nameStyle }}
              src={avatar.src}
              name={avatar.name}
              size={size}
              initials={initials}
              custom={true}
              key={idx}
              cStyle={{ ...cStyle }}
            />
          )
        })}
      </div>
    </TooltipList>
  )
}

export default withStyles(styles)(AvatarPie)
