import { makeStyles } from '@material-ui/core'

export default makeStyles((theme: any) => ({
  root: {
    width: '100%',
    height: 'auto',
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    marginRight: theme.spacing(0.5),
  },
  flexGrow: {
    flexGrow: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  popoverContainer: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '0 0.75rem 0.75rem 0.75rem',
    borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
  },
  paper: {
    backgroundColor: 'transparent !important',
  },
  list: {
    maxHeight: '50vh',
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    paddingRight: theme.spacing(3.5)
  },
  closeIcon: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(1),
  },
  tooltipArrow: {
    color: theme.palette.background.paper,
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  primaryText: {
    color: theme.palette.custom.primary,
  }
}))
