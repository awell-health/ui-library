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
    hideLabel: {
      control: 'boolean',
      defaultValue: true,
    },
    type: {
      control: 'radio',
      options: ['text', 'number'],
      defaultValue: 'text',
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
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const InputField: Story<InputFieldProps> = ({
  label,
  id,
  hideLabel,
  type,
  onChange,
  onClick,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <InputFieldComponent
        type={type}
        label={label}
        onChange={onChange}
        onClick={onClick}
        id={id}
        hideLabel={hideLabel}
      />
    </ThemeProvider>
  )
}

InputField.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
