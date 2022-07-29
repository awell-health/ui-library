import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { DatePicker as DatePickerComponent } from '.'
import { DatePickerProps } from './DatePicker'

export default {
  title: 'atoms/Date Picker',
  component: DatePickerComponent,
  argTypes: {
    id: {
      control: 'text',
      defaultValue: 'date-picker-story-id',
    },
    value: {
      control: 'date',
      defaultValue: new Date(),
    },
    onChange: { action: 'changed' },
  },
} as Meta

export const DatePicker: Story<DatePickerProps> = ({ id, onChange, value }) => {
  return (
    <form>
      <div>
        <h3>Date Picker</h3>
        <DatePickerComponent id={id} onChange={onChange} value={value} />
      </div>
    </form>
  )
}
