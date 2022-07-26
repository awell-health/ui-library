import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { RangeInput as RangeInputComponent, RangeInputProps } from '.'
import { RadioButton } from '../radioButton/radioButton.stories'

export default {
  title: 'Atoms/Range Input',
  component: RangeInputComponent,
  argTypes: {
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

export const RangeInput: Story<RangeInputProps> = ({ sliderConfig }) => {
  return (
    <RangeInputComponent
      onChange={() => null}
      id="range-input-story-id"
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
