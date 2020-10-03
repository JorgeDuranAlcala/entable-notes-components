import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import styles from './styles'

interface IProps extends WithStyles<typeof styles> {
  bg?: string
  handleValue?: (e: any, color: string) => void
}

const ColorSelected = (props: IProps) => {
  const { classes, bg, handleValue: handleClick, ...rest } = props

  return (
    <div
      className={`${classes.root} cursor-pointer inline-block`}
      style={{ background: bg }}
      onClick={(e: any) => handleClick && bg && handleClick(e, bg)}
      {...rest}
    />
  )
}

export default withStyles(styles)(ColorSelected)
