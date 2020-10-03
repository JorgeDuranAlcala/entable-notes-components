import React from 'react'
import TextField from '@material-ui/core/TextField'
import clsx from 'clsx'
import './styles.scss'

export interface EllipsisProps {
  /** Default string to be rendered */
  text: string
  classes: any
  /** Updates row data in parent component with the purpose of persisting when switching table page */
  updateCell: (text: string) => void
}

export default function Ellipsis({ text, updateCell, classes }: EllipsisProps) {
  const [value, setValue] = React.useState(text)
  const textfieldRef = React.useRef(null)
  const { fontSize } = classes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleNewInsertedValue = () => updateCell(value)

  React.useEffect(() => {
    // @ts-ignore
    if (
      textfieldRef &&
      textfieldRef.current &&
      textfieldRef.current.firstChild &&
      textfieldRef.current.firstChild.children[0].nodeName === 'TEXTAREA'
    ) {
      // @ts-ignore
      textfieldRef.current.firstChild.children[0].focus()
    }
  })

  let cls = 'editable'
  cls = clsx(cls, 'table-ellipsis', fontSize)

  return (
    <div className="table-ellipsis-container">
      <TextField
        data-test="table-ellipsis"
        ref={textfieldRef}
        className={cls}
        title={undefined}
        id="standard-multiline-flexible"
        multiline={true}
        value={value}
        variant="outlined"
        onChange={handleChange}
        InputProps={{
          classes: {
            input: fontSize,
          },
        }}
        onBlur={handleNewInsertedValue}
      />
    </div>
  )
}
