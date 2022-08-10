import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { InputField as InputFieldComponent, InputFieldProps } from '.'

export default {
  title: 'Atoms/Input Field',
  component: InputFieldComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Name',
    },
    error: {
      control: 'text',
      defaultValue: '',
    },
    id: {
      control: 'text',
      defaultValue: 'input-field-story-id',
    },
    hideLabel: {
      control: 'boolean',
      defaultValue: false,
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
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const InputField: Story<InputFieldProps> = ({
  error,
  label,
  id,
  hideLabel,
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
      error={error}
      id={id}
      hideLabel={hideLabel}
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
