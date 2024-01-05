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
        max: 10,
        step_value: 1,
        display_marks: true,
        min_label: 'a little',
        max_label: 'a lot',
        is_value_tooltip_on: true,
        show_min_max_values: true,
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
          maxWidth: 500,
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
  const [touched, setTouched] = React.useState(false)
  const [value, setValue] = React.useState<string | undefined>()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
    setValue(event.target.value)
  }

  return (
    <>
      <RangeInputComponent
        label={label}
        onChange={handleChange}
        id={id}
        sliderConfig={sliderConfig}
        mandatory={mandatory}
        onTouched={setTouched}
      />
      <p style={{ marginTop: 80 }}>Touched? {touched.toString()}</p>
      <p style={{ marginTop: 16 }}>Value? {`${value}`}</p>
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
