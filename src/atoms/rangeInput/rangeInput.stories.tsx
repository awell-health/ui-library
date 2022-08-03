import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { RangeInput as RangeInputComponent, RangeInputProps } from '.'

export default {
  title: 'Atoms/Range Input',
  component: RangeInputComponent,
  argTypes: {
    id: {
      control: 'text',
      defaultValue: 'range-input-story-id',
    },
    sliderConfig: {
      defaultValue: {
        min: 0,
        max: 100,
        step_value: 1,
        display_marks: false,
        min_label: 'small',
        max_label: 'big',
        is_value_tooltip_on: false,
        show_min_max_values: false,
      },
      control: 'object',
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

export const RangeInput: Story<RangeInputProps> = ({
  id,
  sliderConfig,
  onChange,
}) => {
  return (
    <RangeInputComponent
      onChange={onChange}
      id={id}
      sliderConfig={sliderConfig}
    />
  )
}

RangeInput.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
