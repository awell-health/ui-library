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
    mandatory: {
      control: 'boolean',
      defaultValue: false,
    },
    onChange: { action: 'changed' },
  },
} as Meta

export const DatePicker: Story<DatePickerProps> = ({
  id,
  onChange,
  value,
  mandatory,
}) => {
  return (
    <form>
      <div
        style={{
          padding: '1em',
        }}
      >
        <DatePickerComponent
          id={id}
          onChange={onChange}
          value={value}
          mandatory={mandatory}
        />
      </div>
    </form>
  )
}
