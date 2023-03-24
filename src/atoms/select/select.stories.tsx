import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Select as SelectComponent, SelectProps } from './Select'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Select',
  component: SelectComponent,
  argTypes: {
    optionsShown: {
      control: 'number',
      defaultValue: 4,
    },
    label: {
      control: 'text',
      defaultValue: 'Name',
    },
    id: {
      control: 'text',
      defaultValue: 'input-field-story-id',
    },
    mandatory: {
      control: 'boolean',
      defaultValue: false,
    },
    onChange: { action: 'change' },
    onClick: { action: 'click' },
    options: {
      control: 'array',
      defaultValue: [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 },
        { label: 'Option 4', value: 4 },
        { label: 'Option 5', value: 5 },
        { label: 'Option 6', value: 6 },
      ],
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

export const SingleSelect: Story<SelectProps> = ({
  label,
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <div style={{ width: '50%' }}>
        <SelectComponent
          type="single"
          label={label}
          onChange={onChange}
          onClick={onClick}
          id={id}
          mandatory={mandatory}
          options={options}
          optionsShown={optionsShown}
        />
      </div>
    </ThemeProvider>
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
  label,
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <div style={{ width: '50%' }}>
        <SelectComponent
          type="single"
          label={label}
          onChange={onChange}
          onClick={onClick}
          id={id}
          mandatory={mandatory}
          options={options}
          optionsShown={optionsShown}
          value={[options[0].value]}
        />
      </div>
    </ThemeProvider>
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
  label,
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <div style={{ width: '50%' }}>
        <SelectComponent
          type="multiple"
          label={label}
          onChange={onChange}
          onClick={onClick}
          id={id}
          mandatory={mandatory}
          options={options}
          optionsShown={optionsShown}
        />
      </div>
    </ThemeProvider>
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
  label,
  id,
  onChange,
  onClick,
  mandatory,
  options,
  optionsShown,
  value,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <div style={{ width: '50%' }}>
        <SelectComponent
          type="multiple"
          label={label}
          onChange={onChange}
          onClick={onClick}
          id={id}
          mandatory={mandatory}
          options={options}
          optionsShown={optionsShown}
          value={[options[0].value, options[1].value]}
        />
      </div>
    </ThemeProvider>
  )
}

MultipleSelectPrefilled.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
