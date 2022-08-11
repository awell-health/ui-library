import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  CheckboxButton as CheckboxButtonComponent,
  CheckboxButtonProps,
} from '.'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Checkbox Button',
  component: CheckboxButtonComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Initial checkbox button label',
    },
    id: {
      control: 'text',
      defaultValue: 'checkbox-button-story-id',
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
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const CheckboxButton: Story<CheckboxButtonProps> = ({
  label,
  id,
  onChange,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <CheckboxButtonComponent label={label} onChange={onChange} id={id} />
    </ThemeProvider>
  )
}

CheckboxButton.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
