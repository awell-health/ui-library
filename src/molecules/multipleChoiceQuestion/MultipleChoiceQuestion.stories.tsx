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
    label: 'Never',
    value: 0,
  },
  {
    id: '2',
    label: 'Sometimes',
    value: 1,
  },
  {
    id: '3',
    label: 'Always',
    value: 2,
  },
]

export default {
  title: 'Molecules/MultipleChoiceQuestion',
  component: MultipleChoiceQuestionComponent,
  argTypes: {
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
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const MultipleChoiceQuestion: Story<MultipleChoiceQuestionProps> = ({
  options,
  onChange,
  values,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <MultipleChoiceQuestionComponent
        options={options}
        onChange={onChange}
        values={values}
      />
    </ThemeProvider>
  )
}
