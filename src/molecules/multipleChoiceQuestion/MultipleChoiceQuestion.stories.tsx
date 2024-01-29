import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  MultipleChoiceQuestion as MultipleChoiceQuestionComponent,
  MultipleChoiceQuestionProps,
} from './MultipleChoiceQuestion'
import { ThemeProvider } from '../../atoms'

const defaultOptions = [
  {
    id: '1',
    label: 'Option 1',
    value: '0',
  },
  {
    id: '2',
    label: 'Option 2',
    value: '1',
  },
  {
    id: '3',
    label: 'Option 3',
    value: '3',
  },
  {
    id: '4',
    label: 'Option 4',
    value: '4',
  },
  {
    id: '5',
    label: 'Option 5',
    value: '5',
  },
  {
    id: '6',
    label:
      'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    value: '6',
  },
  {
    id: '7',
    label: 'Option 7',
    value: '7',
  },
]

export default {
  title: 'Molecules/MultipleChoiceQuestion',
  component: MultipleChoiceQuestionComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'A question label',
    },
    mandatory: {
      control: 'boolean',
      defaultValue: false,
    },
    options: {
      control: 'object',
      defaultValue: defaultOptions,
    },
    onChange: { action: 'change' },
    values: {
      defaultValue: defaultOptions,
    },
  },
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '1em',
          width: 'fit-content',
        }}
      >
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const MultipleChoiceQuestion: Story<MultipleChoiceQuestionProps> = ({
  label,
  options,
  onChange,
  values,
  mandatory,
}) => {
  return (
    <MultipleChoiceQuestionComponent
      questionId="Some id"
      label={label}
      options={options}
      onChange={onChange}
      values={values}
      mandatory={mandatory}
    />
  )
}
