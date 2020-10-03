import { makeStyles } from '@material-ui/core'

export default makeStyles((theme: any) => ({
  root: {
    height: '100%',
  },
  caption: {
    color: '#000',
  },
  difference: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  differenceValue: {
    color: props =>
      // @ts-ignore
      props.positiveDifference ? theme.palette.success.main : theme.palette.error.main,
    marginRight: theme.spacing(1),
  },
}))
