import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
      brandWrapper: {
        background: theme.palette.custom.primary
      },
      logo: {
        fontFamily: 'Montserrat,sans-serif',
        fontSize: theme.fontSize.lg,
        color: theme.palette.custom.contrastText,
      },
      icon: {
        fontSize: theme.fontSize.lg
      },
      title: {
        fontSize: theme.fontSize.lg
      }
}))