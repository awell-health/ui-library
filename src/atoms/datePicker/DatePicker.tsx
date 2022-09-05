import React, { createRef, useState } from 'react'
import DatePickerComponent from 'react-date-picker/dist/entry.nostyle'
import './datePicker.scss'
import { QuestionLabel } from '../questionLabel'
import { format } from 'date-fns'

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
  value: Date | undefined
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
  const [dateValue, setDateValue] = useState<Date | undefined>(value)

  const handleDateChange = (date: Date) => {
    setDateValue(date)
    /**
     * For date type inputs, value must be formatted in yyyy-MM-dd or empty
     */
    const formattedDate = format(date, 'yyyy-MM-dd')
    onChange(formattedDate)
  }

  return (
    <div className={'awell_date_picker'} ref={wrapperRef}>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <DatePickerComponent
        value={dateValue}
        dayPlaceholder="dd"
        monthPlaceholder="MM"
        yearPlaceholder="yyyy"
        format={'dd/MM/yyyy'}
        openCalendarOnFocus
        onChange={handleDateChange}
        clearIcon={null}
      />
    </div>
  )
}
