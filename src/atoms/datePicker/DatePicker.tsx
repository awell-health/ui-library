import React, { createRef, useState } from 'react'
import Calendar from 'react-calendar'
import { format } from 'date-fns'
import './datePicker.scss'
import { InputField } from '../inputField'
import { useClickOutsideNotifier } from '../../hooks/useClickOutsideNotifier'

export interface DatePickerProps {
  /**
   * change event handlers
   */
  onChange: (date: Date) => void
  /**
   * sets label of the button
   */
  label?: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * hide label - use only when label is provided in other manner
   */
  hideLabel?: boolean
}

export const DatePicker = ({
  id,
  onChange,
  ...props
}: DatePickerProps): JSX.Element => {
  const wrapperRef = createRef<HTMLDivElement>()
  const [value, onValueChange] = useState(new Date())
  const [isDatePickerOpen, toggleDatePicker] = useState(false)

  useClickOutsideNotifier({
    ref: wrapperRef,
    clickOutsideHandler: () => toggleDatePicker(false),
  })

  const handleChangeDate = (date: Date) => {
    onValueChange(date)
    onChange(date)
  }

  return (
    <div className={'awell_date_picker'} ref={wrapperRef}>
      <InputField
        {...props}
        id={id}
        type="date"
        value={format(value, 'yyyy-MM-dd')}
        onClick={() => toggleDatePicker(!isDatePickerOpen)}
        onChange={(e) => handleChangeDate(new Date(e.target.value))}
      />
      {isDatePickerOpen && (
        <Calendar onChange={handleChangeDate} value={value} />
      )}
    </div>
  )
}
