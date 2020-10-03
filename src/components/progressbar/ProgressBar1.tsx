import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  bar: {
    height: '15px',
    borderRadius: '2px',
  },
}))

export default function ProgressBar({ value }: { value: number }) {
  const classes = useStyles()

  return (
    <div className={classes.root} title={`${value}%`} data-test="table-progressbar">
      <LinearProgress className={classes.bar} variant="determinate" value={value} />
    </div>
  )
}
