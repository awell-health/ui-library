import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { RadioButton as RadioButtonComponent, RadioButtonProps } from '.'

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

export const RadioButton: Story<RadioButtonProps> = ({ label, id }) => {
  return <RadioButtonComponent label={label} onChange={() => null} id={id} />
}

RadioButton.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
