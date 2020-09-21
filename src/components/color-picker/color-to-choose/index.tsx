import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import { PaletteColor } from 'theme/palette'
import styles from "./styles"


interface IProps extends WithStyles<typeof styles> {
    color:  PaletteColor
    handleClick?: (e: any, color: PaletteColor) => void
}

const ColorToChoose = (props:IProps) => {
    const { classes, color, handleClick, ...rest } = props

    return <div 
                className={`${classes.root} cursor-pointer inline-block`} 
                style={{ background:color.bg }} 
                onClick={ (e:any) => handleClick && color && handleClick(e, color) }
                { ...rest }
            >
        </div>
}

export default withStyles(styles)(ColorToChoose)




