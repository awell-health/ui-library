import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  SingleChoiceQuestion as SingleChoiceQuestionComponent,
  SingleChoiceQuestionProps,
} from './SingleChoiceQuestion'
import { ThemeProvider } from '../../atoms'

const defaultOptions = [
  {
    id: '1',
    label: 'Option 1',
    value: 0,
  },
  {
    id: '2',
    label: 'Option 2',
    value: 1,
  },
  {
    id: '3',
    label: 'Option 3',
    value: 3,
  },
  {
    id: '4',
    label: 'Option 4',
    value: 4,
  },
  {
    id: '5',
    label: 'Option 5',
    value: 5,
  },
  {
    id: '6',
    label:
      'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
    value: 6,
  },
  {
    id: '7',
    label: 'Option 7',
    value: 7,
  },
]

export default {
  title: 'Molecules/SingleChoiceQuestion',
  component: SingleChoiceQuestionComponent,
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
    value: {
      control: 'object',
      defaultValue: defaultOptions[0],
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
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const SingleChoiceQuestion: Story<SingleChoiceQuestionProps> = ({
  label,
  options,
  onChange,
  value,
  mandatory,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <SingleChoiceQuestionComponent
        label={label}
        options={options}
        onChange={onChange}
        value={value}
        mandatory={mandatory}
        questionId='someId'
      />
    </ThemeProvider>
  )
}
