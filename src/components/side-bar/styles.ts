import { createStyles, makeStyles } from '@material-ui/core'
import { ITheme } from 'theme'

export default makeStyles((theme: ITheme) => {
  return (
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
      miniPopoverMenu: {
        height: 'auto'
      },
      bottomList: {},
    }))
  }
)
