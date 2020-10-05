import React from 'react'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { DARK, WHITE, BLACK } from 'theme/palette'
import { GlobalContext } from 'context'

const useStyles = makeStyles((theme: Theme) => createStyles({}))
export const Text = (props: any) => {
  const { theme } = GlobalContext
  debugger
  const classes = useStyles()
  const { fontSize = 'md', color, as = 'p', className = '', opacity = 1 } = props
  const size = theme.fontSize[fontSize] ? theme.fontSize[fontSize] : fontSize
  const Tag = as
  return (
    <Tag
      className={className}
      style={{ fontSize: size, opacity: opacity, color: color ? color : theme.palette.type === DARK ? WHITE : BLACK }}
    >
      {props.children}
    </Tag>
  )
}

export default Text
