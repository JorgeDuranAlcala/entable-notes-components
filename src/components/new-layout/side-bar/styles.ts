import { createStyles,makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => createStyles({
    listItem: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.custom.secondary,
        borderLeft: `4px solid ${theme.palette.custom.primary}`,
        borderRadius: '4px',
        '& $listItemIcon': {
          marginLeft: '-4px',
        },
      },
      '& + &': {
        marginTop: theme.spacing(1),
      },
    },
    activeListItem: {
      borderLeft: `4px solid ${theme.palette.custom.primary}`,
      borderRadius: '4px',
      backgroundColor: theme.palette.custom.secondary,
      '& $listItemText': {
        color: theme.palette.contrastText,
      },
      '& $listItemIcon': {
        marginLeft: '-4px',
      },
    },
    listItemIcon: {
      marginRight: 0,
    },
    listItemText: {
      fontWeight: 500,
      color: theme.palette.contrastText,
    },
    [theme.breakpoints.down('sm')]: {
      menuButton: { display: 'none' },
      profile: { marginTop: theme.spacing(5) },
    },
    'bottom': {
      justifyContent: 'end',
      display: 'flex',
      alignItems: 'center'
    }
}))