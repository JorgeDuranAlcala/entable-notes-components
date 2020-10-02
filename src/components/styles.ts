import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { green, cyan, yellow, pink, purple, orange } from '@material-ui/core/colors'
import settings from 'settings'
const { ui } = settings

export default makeStyles((theme: Theme) => createStyles({
    root: {
        gridTemplateRows: `${ui.headerHeight} auto`,
        margin: '0 auto'
    },
    menu: {
        gridTemplateAreas: `
        'logo header'
        'sidebar main'
        'sidebar main'
        `,
    },
    fullMenu: {
        gridTemplateColumns: `minmax(${ui.sideMenuWidth}, max-content) auto`,
        width: '300px',
        height: '50vh'
    },
    header: {
        gridArea: 'header',
        background: cyan[600],
        height: ui.headerHeight
    },
    mini: {
        gridTemplateColumns: `80px auto`,
        background: cyan[600],
        width: '100px',
        height: '50vh'
    },
    collapsed: {
        gridTemplateAreas: `
        'logo header'
        'main main'
        'main main'
        `,
        gridTemplateColumns: `80px auto`,
    },
    logo: {
        gridArea: 'logo',
        background: cyan[600],
    },
    sidebar: {
        gridArea: 'sidebar',
        background: theme.palette.side.main,
        color: theme.palette.side.color
    },
    main: {
        gridArea: 'main',
        background: green[100],
        display: 'grid',
        gridTemplateColumns: '0px 1fr',
        gridTemplateRows: '80px auto',
        gridTemplateAreas: `
            'header_2 header_2'
            'filter content'
        `,
        '& .filter': {
            gridTemplateColumns: '200px 1fr',
        }
    },
    mainSm: {
        gridTemplateColumns: 'auto',
        gridTemplateRows: '80px 20% auto',
        gridTemplateAreas: `
            'header_2'
            'filter'
            'content'
        `
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