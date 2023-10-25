import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { TypingCaret as TypingCaretComponent } from './TypingCaret'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/TypingCaret',
  component: TypingCaretComponent,
  argTypes: {},
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

export const TypingCaret: Story = () => {
  return <TypingCaretComponent />
}
