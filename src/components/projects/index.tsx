import React from 'react'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import Typography from '@material-ui/core/Typography'
import ProjectContext from 'context/project-context'
import Avatar from 'components/avatar/Avatar'
import Collapse from '@material-ui/core/Collapse'
import useStyles from './styles'
import ListItem from '@material-ui/core/ListItem'
import ProjectIcon from 'components/icons/ProjectIcon'
import { ListItemText } from '@material-ui/core'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { ThemeContext, DARK } from 'theme'
import { GlobalContext } from 'context'

import { useHistory } from 'react-router-dom'

const Projects = () => {
    const classes = useStyles()
    const { projects, setCurrentProject } = React.useContext(ProjectContext)
    const [showProjects, setShowProjects] = React.useState<boolean>(true)
    const [expanded, setExpanded] = React.useState<string[]>([])
    const [selected, setSelected] = React.useState<string[]>([])
    const { palette } = GlobalContext
    const { type } = palette
    const history = useHistory()

    const handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setExpanded(nodeIds)
    }
    const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setSelected(nodeIds)
    }
    
    const renderTree = (project: any) => {
        return (
            <TreeItem
                onClick={() => handleClickProject(project)}
                key={project.id}
                nodeId={project.id}
                label={ProjectNode(project)}
            >
                {Array.isArray(project.projects) ? project.projects.map((project: any) => renderTree(project)) : null}
            </TreeItem>
        )
    }

    const getMembers = (project: any) => {
        let members: number = 0
        members += project.owner ? project.owner.length : 0
        members += project.admins ? project.admins.length : 0
        members += project.users ? project.users.length : 0
        members += project.viewers ? project.viewers.length : 0
        return members
    }

    const handleClickProject = (project: any) => {
        setCurrentProject(project);
        history.push(`/projects/${project.id}`, {
            project: project,
        })
    }

    const ProjectNode = (project: any) => {
        const members: number = getMembers(project)

        return (
            <div className={classes.nodeContainer}>
                <Avatar
                    name={project.name.toUpperCase()}
                    shape="square"
                />
                <div className={classes.information}>
                    <Typography
                        color="textPrimary"
                        className={classes.textPrimary}
                    >
                        {project.name}
                    </Typography>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        className={classes.textSecondary}
                    >
                        {
                            `${members ? `${members} Team ${members > 1 ? 'Members' : 'Member'}` : `No Members`}`
                        }
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <ListItem
                onClick={() => setShowProjects(!showProjects)}
                className={showProjects ? classes.activeHeader : classes.header}
                selected={showProjects}
                button
            >
                <ProjectIcon />
                <ListItemText>
                    <Typography
                        className={classes.headerText}
                        variant="body1"
                    >
                        Project
                </Typography>
                </ListItemText>
            </ListItem>
            <Collapse in={showProjects}>
                <OverlayScrollbarsComponent className={`${classes.root} ${type === DARK ? 'os-theme-light' : 'os-theme-dark'}`}>
                    <TreeView
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        expanded={expanded}
                        selected={selected}
                        onNodeToggle={handleToggle}
                        onNodeSelect={handleSelect}
                        className={classes.tree}
                    >
                        {
                            projects && projects?.map((project: any) => {
                                return (
                                    <TreeItem
                                        onClick={() => handleClickProject(project)}
                                        key={project.id}
                                        nodeId={project.id}
                                        label={ProjectNode(project)}
                                    >
                                        {Array.isArray(project.projects) ? project.projects.map((project: any) => renderTree(project)) : null}
                                    </TreeItem>
                                )
                            })
                        }
                    </TreeView>
                </OverlayScrollbarsComponent>
            </Collapse>
        </React.Fragment>
    );
};

export default Projects;