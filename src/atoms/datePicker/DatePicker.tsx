import React, { createRef, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { format } from 'date-fns'
import './datePicker.scss'
import { InputField } from '../inputField'
import { useClickOutsideNotifier } from '../../hooks/useClickOutsideNotifier'

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
  ...props
}: DatePickerProps): JSX.Element => {
  const wrapperRef = createRef<HTMLDivElement>()

  const [dateValue, setDateValue] = useState<Date>(value)
  const [isDatePickerOpen, toggleDatePicker] = useState(false)

  useEffect(() => {
    setDateValue(value)
  }, [value])

  useEffect(() => {
    onChange(format(dateValue, 'yyyy-MM-dd'))
  }, [dateValue, onChange])

  useClickOutsideNotifier({
    ref: wrapperRef,
    clickOutsideHandler: () => toggleDatePicker(false),
  })

  const handleChangeDate = (date: Date) => {
    setDateValue(date)
    toggleDatePicker(false)
  }

  return (
    <div className={'awell_date_picker'} ref={wrapperRef}>
      <InputField
        {...props}
        label={label}
        id={id}
        type="date"
        value={format(dateValue, 'yyyy-MM-dd')}
        onFocus={() => toggleDatePicker(true)}
        onChange={(e) => setDateValue(new Date(e.target.value))}
        mandatory={mandatory}
      />
      {isDatePickerOpen && (
        <Calendar onChange={handleChangeDate} value={dateValue} />
      )}
    </div>
  )
}
