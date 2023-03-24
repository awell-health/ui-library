import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { ScrollIndicator as ScrollIndicatorComponent } from './ScrollIndicator'
import { ThemeProvider } from '../../atoms'

export default {
  title: 'Atoms/ScrollIndicator',
  component: ScrollIndicatorComponent,
  argTypes: {},
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const ScrollIndicator: Story = () => {
  return <ScrollIndicatorComponent />
}
