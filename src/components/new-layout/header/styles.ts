import { makeStyles, Theme } from '@material-ui/core'

export default makeStyles((theme: Theme) => ({
    root: {
        borderBottom: `1px solid ${theme.palette.background.default}`,
        boxShadow: `0 0 35px 0  ${theme.palette.background.default}`,
    },
}))