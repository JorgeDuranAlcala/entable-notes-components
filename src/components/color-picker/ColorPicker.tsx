import React, { useEffect, useState } from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import { IColor, getAllColors, formatColorsToAnArray } from 'helpers/color'
import ColorToChoose from "./color-to-choose"
import ColorShades from './color-shades'
import styles from "./styles"

interface IProps extends WithStyles<typeof styles> {
    
}

const ColorPicker = (props:IProps) => {
    const { classes, ...rest } = props;
    const [colors, setColors] = useState<any[]>([])
    const [colorSelected, setColorSelected] = useState<string>()
    const [color, setColor] = useState<IColor>()
    const [shade, setShades] = useState<string[]>()

    const handleClick = (e: React.MouseEvent<HTMLElement>, color?: IColor, colorSelected?: string) => {
        if (color && colorSelected) { 
            setShades(Object.keys(color))
            setColorSelected(colorSelected)
            setColor(color)
            console.log(colorSelected)
        }
    }

    const handleValue = (e: React.MouseEvent<HTMLElement>, color?: string) => {
        setColorSelected(color)
    }

    useEffect(() => {
        (async () => {
            const colors = formatColorsToAnArray(await getAllColors())
            setColors(colors)
        }
        )()
    }, [])

    return (
        <div className={classes.root}>
            <div className={`grid grid-cols-5 grid-rows-5 ${classes.root}`} { ...rest }>
                {
                    colors.map((color, index) => <ColorToChoose key={index} bg={color[200]} color={color} handleClick={handleClick} />)
                }
            </div>
            {shade && <ColorShades shades={shade} colorSelected={color} color={colorSelected} handleClick={handleValue} />}
        </div>
    )
}

export default withStyles(styles)(ColorPicker)




