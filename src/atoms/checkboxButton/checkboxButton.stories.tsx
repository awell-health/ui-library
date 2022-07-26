import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  CheckboxButton as CheckboxButtonComponent,
  CheckboxButtonProps,
} from '.'

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

export const CheckboxButton: Story<CheckboxButtonProps> = ({ label, id }) => {
  return <CheckboxButtonComponent label={label} onChange={() => null} id={id} />
}

CheckboxButton.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
