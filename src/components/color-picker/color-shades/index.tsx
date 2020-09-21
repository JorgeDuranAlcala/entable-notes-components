import React, { useState } from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { PaletteColor } from 'theme/palette'
import styles from './styles'
import ColorSelected from '../color-selected'

interface IProps extends WithStyles<typeof styles> {
    shades: PaletteColor[]
    handleClick?: (e:  React.MouseEvent<HTMLElement>, colorSelected?: PaletteColor) => void
}

const SelectColorShade = (props:IProps) => {
    const { classes,  shades, handleClick, ...rest } = props
    const [ shadeSelected, setShadeSelected] = useState<PaletteColor>(shades[0])
    return (
        <React.Fragment>
            <div
                className={`${classes.root} overflow-x-scroll whitespace-no-wrap`}  {...rest}>
                {shades.map(shade =>
                    <ColorSelected
                        bg={shade.bg} handleValue={setShadeSelected} />)}
            </div>
            <div className="inline-flex justify-between w-full">
                <Button
                    variant="contained"
                    style={{ backgroundColor: shadeSelected.bg, color: shadeSelected.text }}
                    onClick={(e:React.MouseEvent<HTMLElement>) => handleClick && handleClick(e, shadeSelected)}>
                    Select
                </Button>
                <Button type="default" variant="contained" onClick={(e:React.MouseEvent<HTMLElement>) => handleClick && handleClick(e)}>
                    Cancel
                </Button>
            </div>
        </React.Fragment>
    )
}

export default withStyles(styles)(SelectColorShade)




