import React, { useEffect, useState } from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import { IColor, getAllColors, formatColorsToAnArray } from 'helpers/color'
import { getPaletteColors, Palettes, PaletteColor } from 'theme/palette'
import ColorToChoose from "./color-to-choose"
import ColorShades from './color-shades'
import styles from "./styles"

interface IProps extends WithStyles<typeof styles> {
    pal?: Palettes
    shadeSelect?: boolean
    cb?: (val: PaletteColor) => void
}

const ColorPicker = (props:IProps) => {
    const { classes, shadeSelect = true, cb, pal = Palettes.otherAll, ...rest } = props;
    const [colors, setColors] = useState<PaletteColor[]>([])
    const [colorSelected, setColorSelected] = useState<PaletteColor|null>(null)
    const [shades, setShades] = useState<PaletteColor[] | null>(null)

    const handleColorSelection = (e: React.MouseEvent<HTMLElement>, selectColor: PaletteColor) => {
        if (selectColor) { 
            if (!shadeSelect ) {
                cb && cb(selectColor)
                return
            }
            const colorShades = getPaletteColors(pal, true, selectColor.clr)
            if (colorShades.length === 1) {
                cb && cb(selectColor)
                return
            }
            setShades(colorShades)
            setColorSelected(selectColor)
        }
    }

    const handleShadeSelection = (e: React.MouseEvent<HTMLElement>, selectColor?: PaletteColor) => {
        setShades(null)
        selectColor && cb && cb(selectColor)
    }

    useEffect(() => {
        (async () => {
            const bgColors =  getPaletteColors(pal, false)
            setColors(bgColors)
        }
        )()
    }, [])

    return (
        <div className={classes.root}>
            <div className={`grid grid-cols-5 grid-rows-5  gap-1 ${classes.root}`} { ...rest }>
                {
                    colors.map((color, index) => <ColorToChoose key={index} color={color}  handleClick={(e: React.MouseEvent<HTMLElement>)=>handleColorSelection(e,color)} />)
                }
            </div>
            {shades && <ColorShades shades={shades}  color={colorSelected} handleClick={handleShadeSelection} />}
        </div>
    )
}

export default withStyles(styles)(ColorPicker)




