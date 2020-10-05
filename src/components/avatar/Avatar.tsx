import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

import Person from '@material-ui/icons/Person'
import { WithStyles, withStyles, Theme, useTheme } from '@material-ui/core/styles'
import { hashNumber, getInitials } from 'helpers/misc'
import GlobalContext from 'context/global-context'
import { LIGHT, WHITE, BLACK, getHashColor, Palettes } from 'theme/palette'
import Tooltip from 'components/tooltip'
import { IAvatar } from './index'

// @ts-ignore
export function valToAvatars(values: any[], col?: any): IAvatar[] {
  return (values || []).map(val => {
    return {
      src: val[0],
      name: val[1],
    }
  })
}

const styles = (_theme: Theme): any => {
  const { theme } = GlobalContext
  const { fontSize, palette, shape, zoomSpacing, typography } = theme
  const color = palette.type === 'light' ? palette.grey[400] : palette.grey['A700']
  const def = palette.background.default
  const spacing2 = zoomSpacing(2)
  const spacing3 = zoomSpacing(3)
  const spacing4 = zoomSpacing(4)
  const spacing5 = zoomSpacing(5)
  const spacing6 = zoomSpacing(6)
  return {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontFamily: typography.fontFamily,
      lineHeight: 1,
      overflow: 'hidden',
      userSelect: 'none',
    },
    /* Styles applied to the root element if not `src` or `srcSet`. */
    colorDefault: {
      color: def,
      backgroundColor: color,
    },
    /* Styles applied to the root element if `variant="circle"`. */
    circle: {
      borderRadius: '50%',
    },
    border: {
      border: `2px solid ${def}`,
    },
    noClass: {},
    icon: {
      height: '100%',
    },
    iconRoot: {
      textAlign: 'center',
    },
    /* Styles applied to the root element if `variant="rounded"`. */
    round: {
      borderRadius: shape.borderRadius,
    },
    /* Styles applied to the root element if `variant="square"`. */
    square: {
      borderRadius: 0,
    },
    /* Styles applied to the img element if either `src` or `srcSet` is defined. */
    img: {
      width: '100%',
      height: '100%',
      // Handle non-square image. The property isn't supported by IE 11.
      objectFit: 'contain',
      // Hide alt text.
      color: 'transparent',
    },
    xs: {
      width: spacing2,
      height: spacing2,
      fontSize: fontSize.xs,
    },
    sm: {
      width: spacing3,
      height: spacing3,
      fontSize: fontSize.sm,
    },
    md: {
      width: spacing4,
      height: spacing4,
      fontSize: fontSize.md,
    },
    lg: {
      width: spacing5,
      height: spacing5,
      fontSize: fontSize.lg,
    },
    xl: {
      width: spacing6,
      height: spacing6,
      fontSize: fontSize.xl,
    },
  }
}

export interface StyleProps extends WithStyles<typeof styles> {}

export const AvatarTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip)

export interface AvatarProps extends StyleProps, IAvatar {}

const Avatar = function Avatar(props: AvatarProps) {
  const { icon } = props
  const {
    name,
    children: childrenProp,
    classes,
    className,
    component: Component = icon ? 'RenderIcon' : 'div',
    imgProps,
    src,
    tooltip = true,
    custom,
    size = 'md',
    shape = 'circle',
    border = true,
    style = { backgroundColor: '#000', color: '#fff' },
    extra,
    cStyle = {},
    Icon,
    color,
    trans = false,
    pal = Palettes.avatar,
    handleClick,
    initials = 2,
    ...other
  } = props
  if (handleClick) {
    // @ts-ignore
    style.cursor = 'pointer'
  }
  const { theme } = GlobalContext
  const { palette } = theme
  const [loadedSrc, setLoadedSrc] = useState<boolean>(false)

  let children = null
  const borderCls = border ? 'border' : 'noClass'

  useEffect(() => {
    if (src) {
      const image = new Image()
      image.src = src
      image.onload = () => {
        setLoadedSrc(true)
      }
      image.onerror = () => {}
    }
  }, [src, setLoadedSrc])

  if (loadedSrc) {
    children = <img alt={name} src={src} className={classes.img} {...imgProps} />
  } else if (childrenProp != null) {
    children = childrenProp
  } else if (name && !extra) {
    if (trans) {
      style.backgroundColor = 'transparent'
      style.color = color ? color : palette.type === LIGHT ? BLACK : WHITE
    } else {
      const number = hashNumber(name)
      const color = getHashColor(number, pal)
      style.backgroundColor = color.bg
      style.color = color.text
    }
    children = Icon ? <Icon style={style} /> : getInitials(name, initials)
  } else {
    children = Icon ? <Icon className={classes.fallback} /> : <Person className={classes.fallback} />
  }
  const cls = custom
    ? ''
    : clsx(
        classes.root,
        classes.system,
        classes[borderCls],
        classes[shape],
        classes[size],
        {
          [classes.colorDefault]: !!!src,
        },
        className
      )
  const child = loadedSrc ? (
    children
  ) : (
    <div className="inline-flex  justify-center items-center" style={cStyle}>
      {children}
    </div>
  )

  const component = (
    <Component
      data-test="avatar"
      aria-label="avatar"
      className={cls}
      style={style}
      {...other}
      onClick={(e: any) => handleClick && handleClick(e)}
    >
      {child}
    </Component>
  )
  return tooltip ? <Tooltip title="Avatar">{component}</Tooltip> : component
}

export default withStyles(styles)(Avatar)
