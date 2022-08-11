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
        <StoryComponent />
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
    <ThemeProvider accentColor="#004ac2">
      <RadioButtonComponent label={label} onChange={onChange} id={id} />
    </ThemeProvider>
  )
}

RadioButton.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
