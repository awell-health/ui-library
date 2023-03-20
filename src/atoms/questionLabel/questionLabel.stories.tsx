import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { QuestionLabel as QuestionLabelComponent, QuestionLabelProps } from '.'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Question Label',
  component: QuestionLabelComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
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
