import { createStyles, fade, withStyles, Theme } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'

export const BootstrapInput = withStyles((theme: Theme) => {
  // @ts-ignore
  const { palette, fontSize } = theme
  const clr = theme.palette.info.light

  return createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: palette.background.paper,
      border: `1px solid ${clr}`,
      fontSize: fontSize.md,
      width: '80%',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      '&:focus': {
        boxShadow: `${fade(palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: palette.primary.main,
      },
    },
  })
})(InputBase)
