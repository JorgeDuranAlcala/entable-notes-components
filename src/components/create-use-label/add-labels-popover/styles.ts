import { makeStyles, Theme } from '@material-ui/core'
import { blue, grey } from '@material-ui/core/colors'
import { common } from '@material-ui/core/colors/'

export default makeStyles((theme: Theme) => ({
    container: {
        maxWidth: '31.25rem',
        minHeight: '18.75rem',
    },
    popover_body: {
        borderBottom: `2px solid ${grey[300]}`,
        flex: 0.8
    },
    popover_footer: {
        flex: 0.2
    },
    btn: {
        '&:hover': {
            backgroundColor: blue[600],
            color: theme.palette.text.primary
        }
    },
    label: {
        backgroundColor: grey[200],
        width:'7.5rem',
        height:'3rem',
    },
    left: {
        zIndex:2,
        backgroundColor: grey[700],
    },
    color: {
        '&:hover': {
            transform: 'scale(1.2)',
            boxShadow: `0 0 20px ${theme.palette.neutral.dark}`,
        } 
    },
    labelText: {
        maxWidth: '5.625rem',
        zIndex: 3,
    },
    input: {
        flex: 0.8,
        maxWidth: '5.625rem',
    },
    opacityIcon: {
        '&:hover': {
            fontSize: '1.4rem'
        }
    }
}))