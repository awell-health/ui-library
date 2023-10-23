import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { AvaGPT as AvaGPTComponent } from './avaGPT'
import { ThemeProvider } from '../../atoms'
import { AvaGPTProps } from './types'

export default {
  title: 'Molecules/AvaGPT',
  component: AvaGPTComponent,
  argTypes: {
    buttonLabel: {
      control: 'text',
      defaultValue: 'Ask AvaGPT',
    },
    state: {
      options: ['indeterminate', 'preload', 'streaming-answer', 'done'],
      control: { type: 'radio' },
      defaultValue: 'indeterminate',
    },
    promptPlaceholder: {
      control: 'text',
      defaultValue: 'A placeholder goes here...',
    },
    answer: {
      control: 'text',
      defaultValue: 'An answer',
    },
    onSubmit: { action: 'submit' },
    onPromptChange: { action: 'change' },
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

export const AvaGPT: Story<AvaGPTProps> = ({
  state,
  promptPlaceholder,
  answer,
  onSubmit,
  onPromptChange,
  buttonLabel,
}) => {
  return (
    <AvaGPTComponent
      open={false}
      prompt={undefined}
      answer={answer}
      promptPlaceholder={promptPlaceholder}
      state={state}
      onSubmit={onSubmit}
      onPromptChange={onPromptChange}
      buttonLabel={buttonLabel}
    />
  )
}
