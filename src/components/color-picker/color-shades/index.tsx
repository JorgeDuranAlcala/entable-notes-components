import React from 'react'
import { withStyles, WithStyles } from '@material-ui/core'
import Button  from '@material-ui/core/Button'
import { IColor } from 'helpers/color'
import styles from './styles'
import ColorSelected from '../color-selected'

interface IProps extends WithStyles<typeof styles> {
    shades: string[]
    colorSelected?: IColor
    color?: string
    handleClick?: (e: any, color?: string) => void
}

const ColorChosen = (props:IProps) => {
    const { classes, color, shades, colorSelected, handleClick, ...rest } = props
    
    return (
        <React.Fragment>
            <div className={`${classes.root} overflow-x-scroll whitespace-no-wrap`}  {...rest}>
                { shades.map(shade => <ColorSelected bg={colorSelected&&colorSelected[shade]} handleValue={handleClick} />)  }
            </div>
            <div className="inline-flex justify-between w-full">
                <Button variant="contained"  style={{backgroundColor:color}}>
                    Select
                </Button>
                <Button variant="contained">
                    Cancel
                </Button>
            </div>
        </React.Fragment>
    )
}

export default withStyles(styles)(ColorChosen)




