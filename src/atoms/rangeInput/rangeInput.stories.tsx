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
      defaultValue: true,
    },
    sliderConfig: {
      defaultValue: {
        min: 0,
        max: 100,
        step_value: 1,
        display_marks: true,
        min_label: 'small',
        max_label: 'big',
        is_value_tooltip_on: true,
        show_min_max_values: true,
      },
      control: 'object',
    },
    onChange: { action: 'change' },
    onChangeValue: { action: 'changeValue' },
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
  ...props
}) => {
  const [value, setValue] = React.useState<number>()
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(Number(e.target.value))
    // @ts-expect-error show new value in Actions tab
    props.onChangeValue(Number(e.target.value))
    onChange(e)
  }
  return (
    <>
      <RangeInputComponent
        label={label}
        onChange={handleChange}
        id={id}
        sliderConfig={sliderConfig}
        mandatory={mandatory}
      />
      <div style={{ marginTop: 80 }}>
        <hr />
        <span>Value: {value === undefined ? 'undefined' : value}</span>
      </div>
    </>
  )
}

RangeInput.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
