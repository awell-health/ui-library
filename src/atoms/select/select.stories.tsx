import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Select as SelectComponent, SelectProps } from './Select'
import { ThemeProvider } from '../../atoms'
import { type Option } from './types'

export default {
  title: 'Atoms/Select',
  component: SelectComponent,
  argTypes: {
    optionsShown: {
      control: 'number',
      defaultValue: 4,
    },
    labels: {
      control: 'object',
      defaultValue: {
        questionLabel: 'Name',
        searchPlaceholder: 'Type to search',
        noOptions: 'No options',
      },
    },
    id: {
      control: 'text',
      defaultValue: 'input-field-story-id',
    },
    mandatory: {
      control: 'boolean',
      defaultValue: true,
    },
    onChange: { action: 'change' },
    onClick: { action: 'click' },
    options: {
      control: 'array',
      defaultValue: [
        { label: 'First Option', value: 0 },
        { label: 'Second Option', value: 1 },
        { label: 'Third Option', value: 2 },
        { label: 'Fourth Option', value: 3 },
        { label: 'Fifth Option', value: 4 },
        { label: 'Sixth Option', value: 5 },
      ],
    },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <div
          style={{
            padding: '1em',
            width: '50%',
          }}
        >
          <StoryComponent />
        </div>
      </ThemeProvider>
    ),
  ],
} as Meta

export const SingleSelect: Story<SelectProps> = ({
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
  labels,
}) => {
  const [value, setValue] = React.useState<number>()
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as number)
    onChange(value)
  }

  return (
    <SelectComponent
      type="single"
      labels={labels}
      onChange={handleChange}
      onClick={onClick}
      id={id}
      mandatory={mandatory}
      options={options}
      optionsShown={optionsShown}
      value={value}
    />
  )
}

SingleSelect.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const SingleSelectPrefilled: Story<SelectProps> = ({
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
  labels,
}) => {
  const [value, setValue] = React.useState<number>(options[0].value)
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as number)
    onChange(value)
  }

  return (
    <SelectComponent
      type="single"
      labels={labels}
      onChange={handleChange}
      onClick={onClick}
      id={id}
      mandatory={mandatory}
      options={options}
      optionsShown={optionsShown}
      value={value}
    />
  )
}

SingleSelectPrefilled.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const MultipleSelect: Story<SelectProps> = ({
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
  labels,
}) => {
  const [value, setValue] = React.useState<Array<Option>>()
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as Array<Option>)
    onChange(value)
  }

  return (
    <SelectComponent
      type="multiple"
      labels={labels}
      onChange={handleChange}
      onClick={onClick}
      id={id}
      mandatory={mandatory}
      options={options}
      optionsShown={optionsShown}
      value={value}
    />
  )
}

MultipleSelect.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const MultipleSelectPrefilled: Story<SelectProps> = ({
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
  labels,
}) => {
  const [value, setValue] = React.useState<Array<Option>>([
    options[0],
    options[1],
  ])
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as Array<Option>)
    onChange(value)
  }

  return (
    <SelectComponent
      type="multiple"
      labels={labels}
      onChange={handleChange}
      onClick={onClick}
      id={id}
      mandatory={mandatory}
      options={options}
      optionsShown={optionsShown}
      value={value}
    />
  )
}

MultipleSelectPrefilled.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
