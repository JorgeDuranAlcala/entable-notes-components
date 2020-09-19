import React, { ReactElement } from 'react'
import useStyles from '../../styles'

function Content(): ReactElement {
    const classes = useStyles()
    return (
        <div className={classes.content}>
            Content
        </div>
    )
}

export default Content