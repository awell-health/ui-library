import React, { createRef, useState } from 'react'
import Calendar from 'react-calendar'
import { format } from 'date-fns'
import './datePicker.scss'
import { InputField } from '../inputField'
import { useClickOutsideNotifier } from '../../hooks/useClickOutsideNotifier'

export interface DatePickerProps {
  onChange: (date: string) => void
  label?: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * hide label - use only when label is provided in other way
   */
  hideLabel?: boolean
  value: Date
}

export const DatePicker = ({
  id,
  onChange,
  value,
  ...props
}: DatePickerProps): JSX.Element => {
  const wrapperRef = createRef<HTMLDivElement>()

  const [dateValue, onValueChange] = useState(value)
  const [isDatePickerOpen, toggleDatePicker] = useState(false)

  useClickOutsideNotifier({
    ref: wrapperRef,
    clickOutsideHandler: () => toggleDatePicker(false),
  })

  const handleChangeDate = (date: Date) => {
    onValueChange(date)
    onChange(format(dateValue, 'yyyy-MM-dd'))
  }

  return (
    <div className={'awell_date_picker'} ref={wrapperRef}>
      <InputField
        {...props}
        id={id}
        type="date"
        hideLabel
        value={format(dateValue, 'yyyy-MM-dd')}
        onClick={() => toggleDatePicker(!isDatePickerOpen)}
        onChange={(e) => handleChangeDate(new Date(e.target.value))}
      />
      {isDatePickerOpen && (
        <Calendar onChange={handleChangeDate} value={dateValue} />
      )}
    </div>
  )
}
