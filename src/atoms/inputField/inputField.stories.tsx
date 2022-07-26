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
    id: {
      control: 'text',
      defaultValue: 'checkbox-button-story-id',
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
}) => {
  return (
    <InputFieldComponent
      type={type}
      label={label}
      onChange={() => null}
      id={id}
      hideLabel={hideLabel}
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
