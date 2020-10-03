import React from 'react'
import { DesktopDateRangePicker, LocalizationProvider } from '@material-ui/pickers'
import enLocale from 'date-fns/locale/en-US'
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns'
const localeMap = {
  en: enLocale,
}

interface DateRangePickerProps {
  /** Stringified dates */
  dates: { start?: string; end?: string }

  /** Date format*/
  format: string

  /** Updates row data in parent component with the purpose of persisting when switching table page */
  updateCell: (datesArray: Date[]) => void
}

const onChange = (date: any) => {
  // updateCell
}

export default ({ dates, format, updateCell }: DateRangePickerProps) => {
  const { start, end } = dates
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={localeMap['en']}>
      <DesktopDateRangePicker
        data-id="daterangepicker"
        calendars={1}
        open={true}
        minDate={new Date('1900-01-01')}
        renderInput={(_startProps, _endProps) => <></>}
        value={[start ? new Date(start) : new Date(), end ? new Date(end) : new Date()]}
        onChange={onChange}
      />
    </LocalizationProvider>
  )
}
