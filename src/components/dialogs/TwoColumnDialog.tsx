import React, { useState, useLayoutEffect } from 'react'
import { withStyles, Theme, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MuiDialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const styles:any = (theme:Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  }
})

const DialogTitle = withStyles(styles)((props:any) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

export default function Dialog(props:any) {
  const { title, handleClose, RightContent, LeftContent, ariaLabelledby= 'two-column-dialog-title' } = props
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)
  const [isDirty, setIsDirty] = React.useState(false)
  const [leftScreen, setLeftScreen] = React.useState(true)
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [isFullScreen, setIsFullScreen] = useState(fullScreen)

  useLayoutEffect(() => {
    if (fullScreen !== isFullScreen) {
      setIsFullScreen(fullScreen)
    }
  }, [fullScreen])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
    handleClose &&  handleClose()
  }

  return (
    <MuiDialog onClose={handleClose} fullScreen={fullScreen} aria-labelledby={ariaLabelledby} open={open}>
      <DialogTitle fullScreen={fullScreen} id={ariaLabelledby} onClose={onClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" disabled={!isDirty}>
            Save
          </Button>
        </DialogActions>
      </MuiDialog>
  )
}