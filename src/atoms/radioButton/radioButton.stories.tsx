import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { RadioButton as RadioButtonComponent, RadioButtonProps } from '.'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Radio Button',
  component: RadioButtonComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Initial radio button label',
    },
    id: {
      control: 'text',
      defaultValue: 'radio-button-story-id',
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

export const RadioButton: Story<RadioButtonProps> = ({
  label,
  id,
  onChange,
}) => {
  return (
    <RadioButtonComponent
      name="Some name"
      label={label}
      onChange={onChange}
      id={id}
    />
  )
}

RadioButton.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
