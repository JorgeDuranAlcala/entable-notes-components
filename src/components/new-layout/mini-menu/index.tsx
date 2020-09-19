import React, { ReactElement } from 'react'
import useStyles from '../styles'
import ClearIcon from '@material-ui/icons/Clear'


function MiniMenu(): ReactElement {
    const classes = useStyles()
    return (
        <div className={classes.miniMenu}>
            miniMenu
        </div>
    )
}

export default MiniMenu