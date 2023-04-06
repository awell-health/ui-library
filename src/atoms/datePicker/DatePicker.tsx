import React, { createRef, useState } from 'react'
import DatePickerComponent from 'react-date-picker/dist/entry.nostyle'
import './datePicker.scss'
import { QuestionLabel } from '../questionLabel'
import { format } from 'date-fns'

export interface DatePickerProps {
  onChange: (date: string | null) => void
  /**
   * Corresponding question label
   */
  label: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  value: Date | null
  /**
   * Is the question required?
   */
  mandatory?: boolean
}

/**
 * @deprecated use InputField with type 'date' instead
 */
export const DatePicker = ({
  id,
  label,
  onChange,
  value,
  mandatory,
}: DatePickerProps): JSX.Element => {
  const wrapperRef = createRef<HTMLDivElement>()
  const [dateValue, setDateValue] = useState<Date | null>(value)

  const handleDateChange = (date: Date) => {
    setDateValue(date)
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : null
    onChange(formattedDate)
  }

  console.warn(
    'DatePicker is deprecated and will be removed in a future release. Please use InputField instead'
  )

  return (
    <div className={'awell_date_picker'} ref={wrapperRef}>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <DatePickerComponent
        value={dateValue}
        dayPlaceholder="dd"
        monthPlaceholder="mm"
        yearPlaceholder="yyyy"
        format={'dd/MM/yyyy'}
        openCalendarOnFocus
        onChange={handleDateChange}
        clearIcon={null}
      />
    </div>
  )
}
