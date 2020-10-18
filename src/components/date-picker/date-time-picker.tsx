// https://v4-0-0-alpha-12.material-ui-pickers.dev/api/DateTimePicker
import React from 'react'
import { DateTimePicker as DateTimePickerInput} from "@material-ui/pickers"
import TextField from "@material-ui/core/TextField"

export default function DateTimePicker(props: any) {
  const { onChange, value } = props
  return (
    <DateTimePickerInput
      renderInput={(props) => <TextField {...props} />}
      value={value}
      onChange={(newValue) => onChange(newValue)}
      minDate={new Date(1900, 1, 1)}
      open={true}
    />
  )
}

export { DateTimePicker }
