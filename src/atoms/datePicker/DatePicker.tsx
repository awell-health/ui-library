import React, { createRef, useEffect, useState } from 'react'
import DatePickerComponent from 'react-date-picker/dist/entry.nostyle'
import './datePicker.scss'
import { QuestionLabel } from '../questionLabel'

export interface DatePickerProps {
  onChange: (date: string) => void
  /**
   * Corresponding question label
   */
  label: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  value: Date
  /**
   * Is the question required?
   */
  mandatory?: boolean
}

export const DatePicker = ({
  id,
  label,
  onChange,
  value,
  mandatory,
}: DatePickerProps): JSX.Element => {
  const wrapperRef = createRef<HTMLDivElement>()
  const [dateValue, setDateValue] = useState<Date>(value)

  useEffect(() => {
    if (dateValue) {
      onChange(dateValue.toLocaleDateString())
    }
  }, [dateValue, onChange])

  return (
    <div className={'awell_date_picker'} ref={wrapperRef}>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <DatePickerComponent
        value={dateValue}
        dayPlaceholder="dd"
        monthPlaceholder="mm"
        yearPlaceholder="yyyy"
        openCalendarOnFocus
        onChange={(date: Date) => setDateValue(date)}
        clearIcon={null}
      />
    </div>
  )
}
