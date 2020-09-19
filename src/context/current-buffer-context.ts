import { createContext } from 'react'
import { Buffer } from 'types'

interface ICurrentBufferContextProps {
    currentBuffer?: Buffer[]
}

const CurrentBufferContext  = createContext({} as ICurrentBufferContextProps)

export default CurrentBufferContext