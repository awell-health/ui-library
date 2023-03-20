import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { InputField as InputFieldComponent, InputFieldProps } from '.'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Input Field',
  component: InputFieldComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Name',
    },
    id: {
      control: 'text',
      defaultValue: 'input-field-story-id',
    },
    type: {
      control: 'radio',
      options: ['text', 'number'],
      defaultValue: 'text',
    },
    mandatory: {
      control: 'boolean',
      defaultValue: false,
    },
    onChange: { action: 'change' },
    onClick: { action: 'click' },
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

export const InputField: Story<InputFieldProps> = ({
  label,
  id,
  type,
  onChange,
  onClick,
  mandatory,
}) => {
  return (
    <InputFieldComponent
      type={type}
      label={label}
      onChange={onChange}
      onClick={onClick}
      id={id}
      mandatory={mandatory}
    />
  )
}

InputField.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
