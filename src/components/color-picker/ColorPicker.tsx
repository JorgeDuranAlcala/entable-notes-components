import React, { useEffect, useState } from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import { IColor, getAllColors, formatColorsToAnArray } from 'helpers/color'
import { getPaletteColors, Palettes, PaletteColor } from 'theme/palette'
import ColorToChoose from "./color-to-choose"
import ColorShades from './color-shades'
import styles from "./styles"

interface IProps extends WithStyles<typeof styles> {
    pal: Palettes
}

const ColorPicker = (props:IProps) => {
    const { classes, pal, ...rest } = props;
    const [colors, setColors] = useState<PaletteColor[]>([])
    const [colorSelected, setColorSelected] = useState<PaletteColor|null>(null)
    const [color, setColor] = useState<PaletteColo|null>(null)
    const [shade, setShades] = useState<PaletteColor[]>()

    const handleClick = (e: React.MouseEvent<HTMLElement>, color?: string, colorSelected?: string) => {
        if (color && colorSelected) { 
            const bgColor = {bg: colorSelected, color: color}
            setShades(getPaletteColors())
            setColorSelected(colorSelected)
            setColor(bgColor)
        }
    }

    const handleValue = (e: React.MouseEvent<HTMLElement>, color?: string) => {
        setColorSelected(color)
    }

    useEffect(() => {
        (async () => {
            const bgColors =  getPaletteColors(pal) 
            setColors(bgColors)
        }
        )()
    }, [])

    return (
        <div className={classes.root}>
            <div className={`grid grid-cols-5 grid-rows-5 ${classes.root}`} { ...rest }>
                {
                    colors.map((color, index) => <ColorToChoose key={index} bg={color.bg} color={color.text} handleClick={handleClick} />)
                }
            </div>
            {shade && <ColorShades shades={shade} colorSelected={color} color={colorSelected} handleClick={handleValue} />}
        </div>
    )
}

export default withStyles(styles)(ColorPicker)




