import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { ThemeProvider } from '../themeProvider'
import { InputField, InputFieldProps } from '../inputField'

export default {
  title: 'atoms/Input Field',
  component: InputField,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Select a date',
    },
    id: {
      control: 'text',
      defaultValue: 'date-picker-story-id',
    },
    value: {
      control: 'string',
      defaultValue: '2023-03-20',
    },
    mandatory: {
      control: 'boolean',
      defaultValue: false,
    },
    onChange: { action: 'changed' },
  },
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const DateInput: Story<InputFieldProps> = ({
  id,
  label,
  onChange,
  value,
  mandatory,
}) => {
  const [date, setDate] = React.useState(value)

  return (
    <>
      <InputField
        type="date"
        label={label}
        onChange={(e) => {
          setDate(e.target.value)
          onChange(e)
        }}
        id={id}
        value={date}
        mandatory={mandatory}
      />
      <br />
      <p style={{ width: '40%' }}>
        If working with incoming values that are Date objects in your app, you
        can use a <code>formatDate</code> function like below to convert it to a
        string that can be used in the <code>value</code> prop. The Awell API
        expects dates to be formatted as <code>yyyy-MM-dd</code>, same as it is
        for native <code>input</code> elements.
      </p>
      <code>
        <pre>
          {`
import { format } from 'date-fns'

const formatDate = (date: Date | null) => {
  if (!date) return format(new Date(), 'yyyy-MM-dd')
  return format(date, 'yyyy-MM-dd')
}

console.log(
  formatDate(new Date(value)) // => '2023-03-20'
)
          `}
        </pre>
      </code>
    </>
  )
}
