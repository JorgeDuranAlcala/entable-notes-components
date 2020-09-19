import React, { ReactElement } from 'react'
import useStyles from '../../styles'

function SubHeader(): ReactElement {
    const classes = useStyles()
    return (
        <div className={classes.header_2}>
            Header_2
        </div>
    )
}

export default SubHeader