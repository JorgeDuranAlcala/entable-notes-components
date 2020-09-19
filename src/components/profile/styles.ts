import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  name: {
    // @ts-ignore
    marginTop: theme.spacing(2),
    // @ts-ignore
    marginBottom: theme.spacing(1),
  },
}))
