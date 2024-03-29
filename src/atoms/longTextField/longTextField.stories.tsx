import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { LongTextField as LongTextFieldComponent, LongTextFieldProps } from '.'
import { ThemeProvider } from '../themeProvider'

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
    mandatory: {
      control: 'boolean',
      defaultValue: false,
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
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const LongTextField: Story<LongTextFieldProps> = ({
  label,
  id,
  value,
  onChange,
  mandatory,
}) => {
  return (
    <LongTextFieldComponent
      label={label}
      onChange={onChange}
      id={id}
      value={value}
      mandatory={mandatory}
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
