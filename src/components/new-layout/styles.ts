import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { green, cyan, yellow, pink, purple, orange } from '@material-ui/core/colors'
import settings from 'settings'
const uiSettings = settings.ui

export default makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        display: 'grid',
        margin: '0 auto',
        gridTemplateRows: `${uiSettings.headerHeight} auto`,
        gridTemplateAreas: `
        'logo header rightdrawer'
        'sidebar main rightdrawer'
        'sidebar main rightdrawer'
        `,
        minHeight: '100vh'
    },
    rightdrawer: {
        gridArea: 'rightdrawer',
        gridTemplateColumns: `minmax(0, ${uiSettings.rightDrawerWidth})  auto`,
        gridTemplateRows: `auto`
    },
    sidebar: {
        gridArea: 'sidebar',
        gridTemplateColumns: `minmax(0,${uiSettings.sideMenuWidth} auto`,
        '&:mini': {
            width: `${uiSettings.miniMenuWidth}`
        },
        background: orange[300]
    },
    header: {
        gridArea: 'header',
        background: cyan[600],
    },
    logo: {
        gridArea: 'logo',
        background: green[300],
    },
    main: {
        gridArea: 'main',
        background: green[100],
        display: 'grid',
        gridTemplateColumns: `minmax(0, ${uiSettings.filterWidth}) auto`,
        gridTemplateRows: `minmax(0, ${uiSettings.header2Height}) auto`,
        gridTemplateAreas: `
            'header_2 header_2'
            'filter content'
        `
    },
    mainSm: {
        gridTemplateRows: 'auto',
        gridTemplateColumns: 'auto',
        gridTemplateAreas: `
            'content'
        `,
        background: purple[50]
    },
    header_2: {
        gridArea: 'header_2',
        background: purple[500]
    },
    filter: {
        gridArea: 'filter',
        background: pink[400]
    },
    content: {
        gridArea: 'content',
        background: yellow[500]
    },
    miniMenu: {
        gridArea: 'sidebar',
        background: pink[200]
    }
}))