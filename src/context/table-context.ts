import { createContext } from 'react'
import { Cell } from 'apps/table/types'

interface ITableContextProps {
    editable?: boolean
    setEditable: (editable:boolean) => void
    focusedCell?: Cell | undefined
    setFocusedCell: (cell?: Cell | undefined) => void
}

const TableContext  = createContext({} as ITableContextProps)

export default TableContext