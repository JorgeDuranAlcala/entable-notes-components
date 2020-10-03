import Box from './Box'
import { BoxProps } from '@material-ui/core/Box'
import { Color, Shade } from 'theme'

export interface IBox extends BoxProps {
  bg?: Color
  color?: 'inverse'
  inverse?: boolean
  shade?: Shade
  round?: boolean
  className?: string
  [key: string]: any
}
export { Box }
export default Box
