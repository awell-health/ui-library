import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { LongTextField as LongTextFieldComponent, LongTextFieldProps } from '.'

export default {
  title: 'Atoms/Long Text Field',
  component: LongTextFieldComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Name',
    },
    id: {
      control: 'text',
      defaultValue: 'longtextfield-story-id',
    },
    hideLabel: {
      control: 'boolean',
      defaultValue: true,
    },
    onChange: { action: 'change' },
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

export const LongTextField: Story<LongTextFieldProps> = ({
  label,
  id,
  hideLabel,
  value,
  onChange,
}) => {
  return (
    <LongTextFieldComponent
      label={label}
      onChange={onChange}
      id={id}
      hideLabel={hideLabel}
      value={value}
    />
  )
}

LongTextField.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
