import React from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './styles'
import { Grid } from '@material-ui/core'
import people from 'mocks/people.json'
import Checkbox from '@material-ui/core/Checkbox'
import CircleCheckedFilled from '@material-ui/icons/CheckCircle'
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { GlobalContext } from 'context'
import { DARK } from 'theme'

const roles = ['owner', 'admin', 'create', 'insert', 'update', 'view']

const Permissions = (props: any) => {
  const classes = useStyles()
  const { project, setProject } = props
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const { palette } = GlobalContext
  const { type } = palette
  const handleExpand = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const checkRole = (person: any, role: string): boolean => {
    const id = person[0]
    const checkRoles = ['owner', 'admin', role]
    for (const crole of checkRoles) {
      if (!project[role]) {
        continue
      }
      for (const rol of project[crole]) {
        if (rol === id) {
          return true
        }
      }
    }
    return false
  }

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>, person: any, role: string) => {
    if (event.target.checked) {
      for (let i = 1; i < roles.length; i++) {
        for (let j = 0; project[roles[i]] && j < project[roles[i]].length; j++) {
          if (project[roles[i]][j] === person[0]) {
            project[roles[i]].splice(j, 1)
          }
        }
      }
      if (!project[role]) {
        project[role] = []
      }
      project[role].push(person[0])
    } else {
      for (let i = 0; i < roles.length; i++) {
        for (let j = 0; project[roles[i]] && j < project[roles[i]].length; j++) {
          if (project[roles[i]][j] === person[0]) {
            project[roles[i]].splice(j, 1)
          }
        }
      }
    }
    const newProject = { ...project }
    setProject(newProject)
    forceUpdate()
  }

  return (
    <Accordion
      expanded={expanded === 'project-permission'}
      onChange={handleExpand('project-permission')}
      classes={{
        root: `${classes.shadowNone} ${classes.accordion}`,
        expanded: classes.m0,
      }}
    >
      <AccordionSummary
        classes={{
          root: classes.p0,
          expanded: classes.m0,
          content: classes.m0,
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="project-permission-content"
        id="project-permission-header"
      >
        <Typography>{'Permissions'}</Typography>
      </AccordionSummary>
      <AccordionDetails
        classes={{
          root: classes.p0,
        }}
      >
        <Grid container wrap="nowrap" direction="column" alignItems="flex-start">
          <Grid item container wrap="nowrap">
            <Grid xs={4} justify="flex-start">
              <Typography
                variant="subtitle2"
                classes={{
                  root: classes.textPrimary,
                }}
                align="left"
              >
                {'PERSON'}
              </Typography>
            </Grid>
            {roles.map(rol => {
              return (
                <Grid xs={3} key={rol}>
                  <Typography
                    variant="subtitle2"
                    classes={{
                      root: classes.textPrimary,
                    }}
                    align="center"
                  >
                    {rol.toUpperCase()}
                  </Typography>
                </Grid>
              )
            })}
          </Grid>
          <OverlayScrollbarsComponent
            className={`${classes.maxH200} ${classes.overflowYScroll} ${classes.wFull} ${
              type === DARK ? 'os-theme-light' : 'os-theme-dark'
            }`}
          >
            {people.map(person => {
              return (
                <Grid item container wrap="nowrap" alignItems="center">
                  <Grid xs={4} justify="flex-start">
                    <Typography variant="subtitle2" align="left">
                      {person[3]}
                    </Typography>
                  </Grid>
                  {roles.map(role => {
                    return (
                      <Grid xs={3} key={person[0]} justify="center">
                        <Checkbox
                          color="default"
                          size="small"
                          checked={checkRole(person, role)}
                          disabled={project.owner[0] === person[0]}
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled className={classes.checkedIcon} />}
                          onChange={event => handleCheck(event, person, role)}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
              )
            })}
          </OverlayScrollbarsComponent>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default Permissions
