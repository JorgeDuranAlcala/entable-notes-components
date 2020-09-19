import { makeStyles } from '@material-ui/core'

export default makeStyles((theme: any) => ({
  root: {
    maxHeight: '35vh',
    overflow: 'auto',
    marginBottom: theme.spacing(2),
  },
  tree: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  nodeContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1.25),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  information: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerText: {
    marginLeft: theme.spacing(3.5),
  },
  textPrimary: {
    marginTop: theme.spacing(0.25),
    marginLeft: theme.spacing(1.5),
  },
  textSecondary: {
    marginTop: theme.spacing(0.25),
    marginLeft: theme.spacing(1.5),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    borderRadius: 5,
  },
  activeHeader: {
    borderLeft: `4px solid ${theme.palette.custom.primary}`,
    backgroundColor: `${theme.palette.custom.secondary} !important`,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    marginBottom: theme.spacing(0.5),
    borderRadius: 5,
  }
}))
