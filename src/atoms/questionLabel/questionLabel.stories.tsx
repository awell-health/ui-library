import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { QuestionLabel as QuestionLabelComponent, QuestionLabelProps } from '.'

export default {
  title: 'Atoms/Question Label',
  component: QuestionLabelComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Name',
    },
    mandatory: {
      control: 'boolean',
      defaultValue: true,
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

export const QuestionLabel: Story<QuestionLabelProps> = ({
  label,
  mandatory,
}) => {
  return <QuestionLabelComponent label={label} mandatory={mandatory} />
}
