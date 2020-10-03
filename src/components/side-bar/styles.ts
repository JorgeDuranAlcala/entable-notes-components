import { createStyles, makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      borderRadius: '4px',
      borderLeft: `4px solid ${theme.palette.side.main}`,
      '&:hover': {
        backgroundColor: theme.palette.side.light,
        borderLeft: `4px solid ${theme.palette.accent.main}`,
      },
    },
    activeListItem: {
      borderLeft: `4px solid ${theme.palette.custom.primary}`,
      backgroundColor: theme.palette.custom.secondary,
      '& $listItemText': {
        color: theme.palette.contrastText,
      },
    },
    bottomList: {},
  })
)
