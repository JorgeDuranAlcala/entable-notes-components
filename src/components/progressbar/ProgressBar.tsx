import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles'

export enum StatusType {
  danger = 'danger',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

export interface IProgressBar {
  value: number
  total?: number
  title?: string
  width?: string
  height?: number
  type?: StatusType
  align?: 'right' | 'left'
  top?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    top: '1rem',
    padding: '0.5rem',
  },
  progress: {
    backgroundColor: '#ddd',
    borderRadius: 'var(--border-radius)',
    height: 'var(--color-height)',
    '&::after': {
      borderRadius: 'var(--border-radius)',
      backgroundColor: 'var(--color-var)',
      content: '""',
      position: 'absolute',
      left: 0,
      height: 'var(--color-height)',
      width: 'var(--width-var)',
    },
  },
  progressText: {
    fontSize: theme.fontSize.xs,
    opacity: 0.6,
    letterSpacing: '1px',
  },
}))

export default function ProgressBar({
  value,
  total = 0,
  title = '',
  width = '100%',
  type = StatusType.info,
  align = 'left',
  height = 12,
  top,
}: IProgressBar) {
  const classes = useStyles()
  const theme = useTheme()
  const txt = `${value}/${total ? total : '%'} ${title}`
  const color = theme.palette[type].main
  const rootStyle: any =
    align === 'left' ? { left: '1rem', textAlign: 'left', width } : { right: '1rem', textAlign: 'right', width }
  const borderRadius = `${height / 2}px`
  const widthPerc = total ? Math.floor((value / total) * 100) : value
  const style = {
    '--border-radius': borderRadius,
    '--color-height': `${height}px`,
    '--width-var': `${widthPerc}%`,
    '--color-var': `${color}`,
  } as React.CSSProperties
  const renderText = <span className={clsx(classes.progressText, top ? 'mb-1' : 'mt-1')}>{txt}</span>

  return (
    <div aria-label="progress-bar1" className={clsx(classes.root, 'relative flex flex-col')} style={rootStyle}>
      {top && renderText}
      <div className={clsx(classes.progress, 'w-full')} style={style}></div>
      {!top && renderText}
    </div>
  )
}
