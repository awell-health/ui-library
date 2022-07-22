import React, { useState } from 'react'
import Calendar from 'react-calendar'

export const DatePicker = () => {
  const [value, onChange] = useState(new Date())
  const [isDatePickerOpen, toggleDatePicker] = useState(false)

  return (
    <div>
      <input
        type="button"
        value={value.toLocaleDateString()}
        onClick={() => toggleDatePicker(!isDatePickerOpen)}
      />
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}
