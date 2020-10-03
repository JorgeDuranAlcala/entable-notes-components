import React from 'react'
import { IconButton, Button, TextField, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import useStyles from './styles'
import session from 'mocks/session.json'
import ProjectContext from 'context/project-context'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { ProjectPermissions } from 'components'

const { user } = session

const EditProject = () => {
  const classes = useStyles()
  const { currentProject, setCurrentProject, projects, setProjects } = React.useContext(ProjectContext)
  const [open, setOpen] = React.useState(false)
  const [project, setProject] = React.useState(currentProject)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const checkEditPermission = (project: any, user: any) => {
    const id = user[0]
    if (project.owner) {
      for (const owner of project.owner) {
        if (id === owner) {
          return true
        }
      }
    }
    if (project.admins) {
      for (const admin of project.admins) {
        if (id === admin) {
          return true
        }
      }
    }
    return false
  }
  const editPermissions = checkEditPermission(currentProject, user)

  const handleEdit = () => {
    setCurrentProject(project)
    if (projects) {
      const editIndex = projects.findIndex(p => p.id === project.id)
      if (editIndex > 0) {
        projects[editIndex] = project
      } else {
        let parentIndex: number = -1
        let childIndex: number = -1
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].projects) {
            for (let j = 0; j < projects[i].projects.length; j++) {
              if (project.id === projects[i].projects[j].id) {
                parentIndex = i
                childIndex = j
                break
              }
            }
          }
        }
        if (projects[parentIndex]) {
          projects[parentIndex].projects[childIndex] = project
        }
      }
    }
    setProjects(projects)
    handleClose()
  }

  React.useEffect(() => {
    setProject(currentProject)
  }, [currentProject])

  return (
    <React.Fragment>
      {editPermissions ? (
        <IconButton onClick={!open ? handleOpen : undefined} classes={{ root: classes.iconButton }}>
          <EditIcon fontSize="small" />
          {open ? (
            <ClickAwayListener onClickAway={handleClose}>
              <div className={classes.paper}>
                <IconButton className={classes.closeIcon} onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
                <Typography variant="h4" align="center">
                  Edit Project
                </Typography>
                <TextField
                  className={`${classes.marginVertical} ${classes.textField}`}
                  fullWidth
                  label="Name"
                  variant="standard"
                  color="primary"
                  error={!project.name}
                  value={project.name}
                  onChange={e => setProject({ ...project, name: e.target.value })}
                />
                <TextField
                  className={`${classes.marginVertical} ${classes.textField}`}
                  fullWidth
                  multiline
                  rows={4}
                  rowsMax={8}
                  label="Description"
                  variant="standard"
                  color="primary"
                  error={!project.description}
                  value={project.description}
                  onChange={e => setProject({ ...project, description: e.target.value })}
                />
                <ProjectPermissions project={project} setProject={setProject} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit()}
                  disabled={!(project.name && project.description)}
                >
                  Save Changes
                </Button>
              </div>
            </ClickAwayListener>
          ) : undefined}
        </IconButton>
      ) : undefined}
    </React.Fragment>
  )
}

export default EditProject
