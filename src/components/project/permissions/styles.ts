import { makeStyles } from '@material-ui/core'

export default makeStyles((theme: any) => ({
  shadowNone: {
    boxShadow: 'none',
  },
  p0: {
    padding: 0,
  },
  m0: {
    margin: '0 !important',
  },
  flexNoWrap: {
    flexWrap: 'nowrap',
  },
  wFull: {
    width: '100%',
  },
  textPrimary: {
    color: theme.palette.custom.primary,
  },
  checkedIcon: {
    color: theme.palette.custom.primary,
  },
  accordion: {
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  overflowYScroll: {
    overflowY: 'scroll',
  },
  maxH200: {
    maxHeight: 200,
  },
}))
