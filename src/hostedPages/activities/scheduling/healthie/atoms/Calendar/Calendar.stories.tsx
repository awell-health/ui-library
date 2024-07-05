import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Calendar as CalendarComponent, CalendarProps } from './Calendar'
import { ThemeProvider } from '../../../../../../atoms'

export default {
  title: 'HostedPages/Activities/Scheduling/Healthie/Atoms/Calendar',
  component: CalendarComponent,
  argTypes: {
    onSelect: { action: 'selected' },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const Calendar: Story<CalendarProps> = ({ onSelect }) => {
  return (
    <div style={{ padding: '2rem' }}>
      <CalendarComponent onSelect={onSelect} />
    </div>
  )
}
