import { withStyles } from "@material-ui/styles"
import MuiButton from "@material-ui/core/Button"
import { Theme } from "@material-ui/core/styles"

export  const Button = withStyles((theme: Theme) => ({
  root: props => {
    // @ts-ignore
    const color = theme.palette[props.color ||  'default']
    debugger
    return (
    {
        color: color.color,
        backgroundColor: color.main,
        "&:hover": {
          backgroundColor: color.dark,
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            backgroundColor: color.main
          }
        }
      }
    )
  }
}))(MuiButton)

export default Button