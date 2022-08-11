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
  title: 'Molecules/SingleChoiceQuestion',
  component: SingleChoiceQuestionComponent,
  argTypes: {
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
  options,
  onChange,
  value,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <SingleChoiceQuestionComponent
        options={options}
        onChange={onChange}
        value={value}
      />
    </ThemeProvider>
  )
}
