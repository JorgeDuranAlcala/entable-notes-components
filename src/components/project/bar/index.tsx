import React from 'react';
import {
    Typography,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from 'components/avatar/Avatar'
import people from 'mocks/people.json'
import Popover from '@material-ui/core/Popover';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { DARK } from 'theme'
import { GlobalContext } from 'context'
import useStyles from './styles'
import { EditProject } from 'components';

const ProjectBar = (props: any) => {
    const classes = useStyles()
    const { project } = props
    const { palette } = GlobalContext
    const { type } = palette
    const allUsers = [project.owner, project.admins, project.users, project.viewers]
    const getImageSrcById = (id: string) => {
        let user = ""
        const result = people.find(p => p[0] === id)
        if (result) {
            user = result[2]
        }
        return user;
    }

    const UserInformation = (id: string) => {
        let user = people.find(p => p[0] === id)
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar src={getImageSrcById(id)} />
                </ListItemAvatar>
                {user ? <ListItemText primary={user[3]} secondary={user[1]} /> : undefined}
            </ListItem>
        )
    }

    const UsersInformationList = (props: any) => {
        const { handleClose } = props
        return (
            <div className={classes.popoverContainer} onMouseLeave={() => handleClose()}>
                <div className={classes.arrow} />
                <OverlayScrollbarsComponent className={`${classes.list} ${type === DARK ? 'os-theme-light' : 'os-theme-dark'}`}>
                    <IconButton
                        className={classes.closeIcon}
                        size="small"
                        onClick={() => handleClose()}
                    >
                        <CloseIcon />
                    </IconButton>
                    {
                        allUsers.map((userClass: any, index: number) => {
                            return (
                                <React.Fragment>
                                    {
                                        userClass && index === 0 ?
                                            <Typography className={classes.primaryText} variant="subtitle1">
                                                Owner
                                            </Typography>
                                            :
                                            undefined
                                    }
                                    {
                                        userClass && index === 1 ?
                                            <Typography className={classes.primaryText} variant="subtitle1">
                                                Admins
                                            </Typography>
                                            :
                                            undefined
                                    }
                                    {
                                        userClass && index === 2 ?
                                            <Typography className={classes.primaryText} variant="subtitle1">
                                                Users
                                            </Typography>
                                            :
                                            undefined
                                    }
                                    {
                                        userClass && index === 3 ?
                                            <Typography className={classes.primaryText} variant="subtitle1">
                                                Viewers
                                            </Typography>
                                            :
                                            undefined
                                    }
                                    {
                                        userClass && userClass.map((user: any, index: number) => {
                                            return (
                                                UserInformation(user)
                                            )
                                        })
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </OverlayScrollbarsComponent>
            </div>
        )
    }

    const Avatars = () => {
        const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
        const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            setAnchorEl(event.currentTarget)
        }
        const handlePopoverClose = () => {
            setAnchorEl(null)
        }
        const open = Boolean(anchorEl)
        return (
            <div
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <AvatarGroup max={5}>
                    {
                        allUsers.map((userClass: any, index: number) => {
                            return (
                                userClass && userClass.map((user: any, index: number) => {
                                    return (
                                        <Avatar src={getImageSrcById(user)} />
                                    )
                                })
                            )
                        })
                    }
                </AvatarGroup>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                    classes={{ paper: classes.paper }}
                    PaperProps={{
                        elevation: 0,
                    }}
                >
                    <UsersInformationList
                        handleClose={handlePopoverClose}
                    />
                </Popover>
            </div>
        )
    }

    

    return (
        <div className={classes.root}>
            <div className={`${classes.flexGrow} ${classes.row}`}>
                <Tooltip
                    arrow
                    interactive
                    placement="bottom-start"
                    classes={{
                        tooltip: classes.tooltip,
                        arrow: classes.tooltipArrow
                    }}
                    title={
                        <Typography color="textPrimary">
                            {project.description}
                        </Typography>
                    }
                >
                    <Typography
                        className={classes.title}
                        variant="h6"
                    >
                        {props.project.name}
                    </Typography>
                </Tooltip>
                <EditProject/>
            </div>
            <Avatars />
        </div>
    );
};

export default ProjectBar;