import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Select as SelectComponent, SelectProps } from './Select'
import { ThemeProvider } from '../../atoms'
import { type Option } from './types'

export default {
  title: 'Atoms/Select',
  component: SelectComponent,
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
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
    mandatory: {
      control: 'boolean',
      defaultValue: true,
    },
    showCount: {
      control: 'boolean',
      defaultValue: true,
    },
    displayMaxLength: {
      control: 'number',
      defaultValue: 15,
    },
    onChange: { action: 'change' },
    onClick: { action: 'click' },
    options: {
      control: 'array',
      defaultValue: [
        { label: 'No known allergies', value: 0 },
        { label: 'Taking prescription medication', value: 1 },
        { label: 'History of heart disease', value: 2 },
        { label: 'Regular exercise routine', value: 3 },
        { label: 'Following a balanced diet', value: 4 },
        { label: 'Experiencing chronic pain', value: 5 },
      ],
    },
    filtering: {
      control: 'boolean',
      defaultValue: true,
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
  filtering,
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
      filtering={filtering}
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
  filtering,
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
      filtering={filtering}
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
  showCount,
  displayMaxLength,
  filtering,
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
      showCount={showCount}
      displayMaxLength={displayMaxLength}
      filtering={filtering}
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
  showCount,
  displayMaxLength,
  filtering,
}) => {
  const [value, setValue] = React.useState<Array<Option>>([
    options[0],
    options[1],
    options[5],
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
      showCount={showCount}
      displayMaxLength={displayMaxLength}
      filtering={filtering}
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

export const SingleSelectNoFiltering: Story<SelectProps> = ({
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
  labels,
  showCount,
  displayMaxLength,
}) => {
  const [value, setValue] = React.useState<number>()
  const [valueFilled, setValueFilled] = React.useState<number>(1)
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as number)
    onChange(value)
  }
  const handleFilledChange = (value: Array<Option> | number) => {
    setValueFilled(value as number)
    onChange(value)
  }

  return (
    <>
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
        showCount={showCount}
        displayMaxLength={displayMaxLength}
        filtering={false}
      />
      <br />
      <SelectComponent
        type="single"
        labels={labels}
        onChange={handleFilledChange}
        onClick={onClick}
        id={id}
        mandatory={mandatory}
        options={options}
        optionsShown={optionsShown}
        value={valueFilled}
        showCount={showCount}
        displayMaxLength={displayMaxLength}
        filtering={false}
      />
    </>
  )
}

SingleSelectNoFiltering.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
export const MultipleSelectNoFiltering: Story<SelectProps> = ({
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
  labels,
  showCount,
  displayMaxLength,
}) => {
  const [value, setValue] = React.useState<Array<Option>>()
  const [valueFilled, setValueFilled] = React.useState<Array<Option>>([
    options[0],
    options[1],
    options[5],
  ])
  const handleChange = (value: Array<Option> | number) => {
    setValue(value as Array<Option>)
    onChange(value)
  }
  const handleFilledChange = (value: Array<Option> | number) => {
    setValueFilled(value as Array<Option>)
    onChange(value)
  }

  return (
    <>
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
        showCount={showCount}
        displayMaxLength={displayMaxLength}
        filtering={false}
      />
      <br />
      <SelectComponent
        type="multiple"
        labels={labels}
        onChange={handleFilledChange}
        onClick={onClick}
        id={id}
        mandatory={mandatory}
        options={options}
        optionsShown={optionsShown}
        value={valueFilled}
        showCount={showCount}
        displayMaxLength={displayMaxLength}
        filtering={false}
      />
    </>
  )
}

MultipleSelectNoFiltering.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
