import React, { ReactElement } from 'react'
import useStyles from '../styles'
import { useTheme, useMediaQuery } from '@material-ui/core'
import clsx from 'clsx'

import SubHeader from './sub-header';
import Filter from './filter'
import Content from './content';

function Main(): ReactElement {
    const classes = useStyles()
    const theme = useTheme()
    const smallScreens = useMediaQuery(theme.breakpoints.down('sm'))

    const cls_main = clsx({
        [classes.main]: true,
        [classes.mainSm]: smallScreens,
    })

    return (
        <div className={cls_main}>
            <SubHeader/>
            <Filter/>
            <Content/>
        </div>
    )
}

export default Main