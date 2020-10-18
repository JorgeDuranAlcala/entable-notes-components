// https://v4-0-0-alpha-12.material-ui-pickers.dev/api/DateTimePicker
import React from 'react'
import { TimePicker as TimePickerInput} from "@material-ui/pickers"
import TextField from "@material-ui/core/TextField"

export default function TimePicker(props: any) {
  const { onChange, value } = props
  return (
    <TimePickerInput
    renderInput={(props) => <TextField {...props} />}
    ampm={false}
    value={value}
    onChange={(newValue) => onChange(newValue)}
    open={true}
  />
  )
}

export { TimePicker }
