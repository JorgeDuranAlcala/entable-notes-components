// https://v4-0-0-alpha-12.material-ui-pickers.dev/api/DateTimePicker
import React from 'react'
import { DesktopDatePicker as DatePickerInput, LocalizationProvider } from "@material-ui/pickers"
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import enLocale from "date-fns/locale/en-US"
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns"
import TextField from "@material-ui/core/TextField"

const localeMap = {
  en: enLocale
}

const DateTimePicker = React.forwardRef((props: any) => {
  const { onChange, value } = props
  debugger
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={localeMap['en']}>
      <ClickAwayListener onClickAway={()=>onChange()}>
        <DatePickerInput
          renderInput={(props) => <TextField {...props} />}
          value={new Date(value)}
          onChange={(newValue) => onChange(newValue)}
          minDate={new Date(1900, 1, 1)}
          open={true}
        />
      </ClickAwayListener>
    </LocalizationProvider>
  )
})

export default DateTimePicker