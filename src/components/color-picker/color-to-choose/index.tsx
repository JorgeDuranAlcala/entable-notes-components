import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import { PaletteColor } from 'theme/palette'

interface IProps  {
  color: PaletteColor
  handleClick?: (e: any, color: PaletteColor) => void
}

const ColorToChoose = (props: IProps) => {
  const { color, handleClick, ...rest } = props

  return (
    <div
      className={`w-12 h-12 rounded-full cursor-pointer inline-block`}
      style={{ background: color.bg }}
      onClick={(e: any) => handleClick && color && handleClick(e, color)}
      {...rest}
    ></div>
  )
}

export default ColorToChoose
