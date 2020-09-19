import React, { ReactElement } from 'react'
import useStyles from '../../styles'
import ClearIcon from '@material-ui/icons/Clear'


function Filter(): ReactElement {
    const classes = useStyles()
    return (
        <div className={classes.filter}>
            Filter
        </div>
    )
}

export default Filter