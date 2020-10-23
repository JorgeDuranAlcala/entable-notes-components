import React, { useState, useLayoutEffect } from 'react'
import { withStyles, Theme, useTheme, makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MuiDialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid, { GridSpacing } from '@material-ui/core/Grid'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Hidden from '@material-ui/core/Hidden'
import withWidth, { WithWidth } from '@material-ui/core/withWidth'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    header: {
        display: 'flex',
        padding: theme.spacing(1),
        justifyContent: 'space-between'
    },
    closeButton: {
        color: theme.palette.grey[500],
    },
    leftButton: {

    },
    rightButton: {

    }
}))

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent)

const Dialog = (props:any) => {
    const { title, handleClose, rightContent, leftContent, ariaLabelledby= 'two-column-dialog-title' } = props
    const theme = useTheme()
    const [open, setOpen] = React.useState(true)
    const [isDirty, setIsDirty] = React.useState(false)
    const [leftScreen, setLeftScreen] = React.useState(true)
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const [isFullScreen, setIsFullScreen] = useState(fullScreen)
    const classes = useStyles()
    const [visibleRight, setVisibleRight] = useState(false)

    useLayoutEffect(() => {
        if (fullScreen !== isFullScreen) {
            setIsFullScreen(fullScreen)
        }
    }, [fullScreen])

    const handleClickOpen = () => {
        setOpen(true)
    }
  
    const showRight = () => {
        setVisibleRight(true)
    }

    const hideRight = () => {
        setVisibleRight(false)
    }

    const onClose = () => {
        setOpen(false)
        handleClose &&  handleClose()
    }

  return (
    <MuiDialog onClose={handleClose} fullScreen={fullScreen} aria-labelledby={ariaLabelledby} open={open}>
        <div className={classes.header}>
        {
            isFullScreen ?
                visibleRight ?
                    <IconButton aria-label="close" className={classes.leftButton} onClick={hideRight}>
                        <KeyboardArrowLeftIcon fontSize="large"/>
                    </IconButton>
                    :
                    <IconButton aria-label="close" className={classes.rightButton} onClick={showRight}>
                        <KeyboardArrowRightIcon fontSize="large"/>
                    </IconButton>
                :
                <div />
        }

        {
            onClose ? 
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon fontSize="large"/>
                </IconButton>
                :
                null
        }
        </div>
        <DialogContent dividers>
            <Grid container >
            {
                isFullScreen ?
                    visibleRight ?
                        rightContent
                        :
                        leftContent
                    :
                    <>
                        <Grid item xs={12} md={6}>
                            {leftContent}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            {rightContent}
                        </Grid>
                    </>
            }
            </Grid>
        </DialogContent>
      </MuiDialog>
  )
}

export default Dialog