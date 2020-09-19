// https://material-ui.com/customization/breakpoints/
import React, { ReactElement, useLayoutEffect, useState } from 'react'
import clsx from 'clsx'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

import { Size } from 'theme'
import Header from './header'
import Sidebar from './side-bar'
import MiniMenu from './mini-menu'
import MainContent from './main-content'
import LogoHeader from './logo-header'
import useStyles from './styles'

interface IProps {
    mainItems?: any
    sideItems?: any
    headerContent?: any
    logoContent?: any
    showMini?: boolean
    showSide?: boolean
    width: Size
    filterContent?: any
    rightDrawerContent?: any
}

function NewLayout({ logoContent, headerContent, showMini, sideItems, width }: IProps): ReactElement {
    const classes = useStyles()
    const [collapseSidebar, setCollapseSidebar] = useState(!sideItems)
    const [miniMenu, setMiniMenu] = useState(false)
    const [okToShowMini, setOkToShowMini] = useState(showMini && (isWidthUp('sm', width)))

    useLayoutEffect(() => {
        const newOkToShowMini = showMini && (isWidthUp('sm', width))
        if (newOkToShowMini !== okToShowMini) {
            setOkToShowMini(newOkToShowMini)
            if (miniMenu) {
                setMiniMenu(false)
            }
        }
    }, [width])

    const collapsed = !miniMenu && collapseSidebar
    const collapseLogoHeader = miniMenu || collapseSidebar
    const clsContainer = clsx({
        [classes.root]: true,
        [classes.miniMenu]: collapseLogoHeader,
        [classes.sidebar]: !collapseLogoHeader
    })

    function stopPropogation(e: any) {
        e && e.stopPropogation && e.stopPropogation(e)
    }

    const handleToggleSidebar = (e: any) => {
        stopPropogation(e)
        if (miniMenu) {
            setCollapseSidebar(false)
            setMiniMenu(false)
        } else {
            if (okToShowMini && !collapseSidebar) {
                setMiniMenu(true)
                setCollapseSidebar(true)
            } else {
                setMiniMenu(false)
                setCollapseSidebar(!collapseSidebar)
            }
        }
    }
    
    return (
        <div className={clsContainer}>
            {sideItems && <LogoHeader
                collapsed={collapseLogoHeader}
                logoContent={logoContent}
                onToggle={handleToggleSidebar}
            />}
            <Header aria-label="grid-header" headerContent={headerContent}/>
            {sideItems && !collapsed &&
                <Sidebar mini={miniMenu} items={sideItems} />}
        </div>
    )
}

export default withWidth()(NewLayout)