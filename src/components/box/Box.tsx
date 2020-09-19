import React, { forwardRef } from "react"
import { useTheme } from '@material-ui/core/styles'
import MuiBox from '@material-ui/core/Box'
import {  getColors } from 'theme'
import { IBox } from './index'
/**
 * React component used to create flexbox layouts.
 *
 * It renders a `div` with `display: flex` and
 * comes with helpful style shorthand.
 *
 */
export const Box = forwardRef((props: IBox, ref: any) => {
  // @ts-ignore
  const { color, style, inverse, round, className='', ...rest } = props
  const theme = useTheme()
  const cls = `flex justify-between items-center ${className}`

  const { bgColor, borderColor, textColor } = getColors(theme, props)
  if (borderColor && !rest.borderColor) {
    rest.borderColor = borderColor
  }
  let newStyle:any = {...style}
  if (round) {
    newStyle.borderRadius = '9999px'
  }
  // @ts-nocheck
  return <MuiBox
            bgcolor={bgColor}
            color={textColor}
            style={newStyle}
            className={cls}
            {...rest}
          />
})

export default Box