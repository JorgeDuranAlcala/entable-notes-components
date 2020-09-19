import { makeStyles } from '@material-ui/core'

export default makeStyles((theme: any) => ({
    iconButton: {
        padding: theme.spacing(0.75),
        position: 'relative',
    },
    marginVertical: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
    },
    buttonContainer: {
        justifyContent: 'right'
    },
    button: {
        backgroundColor: theme.palette.custom.primary,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        color: theme.palette.custom.contrastPrimary,
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.custom.primary,
        },
    },
    closeIcon: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
    textField: {
        '& label.Mui-focused': {
            color: theme.palette.custom.primary,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.custom.primary,
        },
    },
    paper: {
        position: 'absolute',
        top: '-50%',
        left: '150%',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
        zIndex: theme.zIndex.drawer,
        '&:hover': {
            boxShadow: theme.shadows[10]
        }
    },
}))
