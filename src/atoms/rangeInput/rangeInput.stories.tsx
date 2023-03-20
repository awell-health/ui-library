import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { RangeInput as RangeInputComponent, RangeInputProps } from '.'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Range Input',
  component: RangeInputComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'A question label',
    },
    id: {
      control: 'text',
      defaultValue: 'range-input-story-id',
    },
    mandatory: {
      control: 'boolean',
      defaultValue: false,
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
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const RangeInput: Story<RangeInputProps> = ({
  label,
  id,
  sliderConfig,
  onChange,
  mandatory,
}) => {
  return (
    <RangeInputComponent
      label={label}
      onChange={onChange}
      id={id}
      sliderConfig={sliderConfig}
      mandatory={mandatory}
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
