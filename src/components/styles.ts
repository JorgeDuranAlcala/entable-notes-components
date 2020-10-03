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
        width: '300px'
    },
    header: {
        gridArea: 'header',
        background: cyan[600],
        height: ui.headerHeight
    },
    mini: {
        gridTemplateColumns: `80px auto`,
        background: cyan[600],
        width: `${ui.miniMenuWidth}`
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
    // https://codepen.io/alligatorio/pen/abORvVW
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_scrollbar2
    scrollBar: {
        overflowY: "auto",
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            width: '0.25rem'
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px grey',
            borderRadius: '0.5rem',
            backgroundColor: '#000'
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'red', 
            borderRadius: '0.5rem'
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#b30000'
        }
    },
    sidebar: {
        gridArea: 'sidebar',
        background: theme.palette.side.main,
        color: theme.palette.side.color,
        height: '60vh'
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