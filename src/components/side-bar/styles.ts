import { createStyles,makeStyles, Theme } from '@material-ui/core'
import settings from 'settings'

const { ui } = settings

export default makeStyles((theme: Theme) => createStyles({
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  },
  margin: {
      
  },
  listItem: {
    cursor: 'pointer',
    paddingTop: '4px',
    paddingBottom: '4px',
    borderRadius: '4px',
    borderLeft: `4px solid ${theme.palette.side.main}`,
    '&:hover': {
      backgroundColor: theme.palette.side.light,
      borderLeft: `4px solid ${theme.palette.accent.main}`,
    }
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.custom.primary}`,
    backgroundColor: theme.palette.custom.secondary,
    '& $listItemText': {
      color: theme.palette.contrastText,
    },
  },
  listItemIcon: {
    marginRight: 0,
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.contrastText,
  },
  root: {
    maxHeight: '50vh',
    overflow: 'auto',
    marginBottom: theme.spacing(2),
  },
  information: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    marginLeft: theme.spacing(3.5),
  },
  text: {
    marginTop: theme.spacing(0.25),
    marginLeft: theme.spacing(1.5),
  },
}))