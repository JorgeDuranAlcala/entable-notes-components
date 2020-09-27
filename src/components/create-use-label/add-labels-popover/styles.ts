import { makeStyles, Theme } from '@material-ui/core'
import { blue, grey } from '@material-ui/core/colors';

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
    },
    left: {
        width: 1,
        zIndex: 1,
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
        zIndex: 99,
    },
    input: {
        flex: 0.8,
        maxWidth: '5.625rem',
    }
}))