import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Calendar as CalendarComponent, CalendarProps } from './Calendar'
import { ThemeProvider } from '../../atoms'
import { addDays } from 'date-fns'

export default {
  title: 'Atoms/Calendar',
  component: CalendarComponent,
  argTypes: {
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
    onSelect: { action: 'selected' },
    weekStartsOn: {
      control: 'select',
      options: ['sunday', 'monday'],
      defaultValue: 'sunday',
    },
    availableDates: {
      control: 'array',
      defaultValue: [
        addDays(new Date(), -1),
        addDays(new Date(), 7),
        addDays(new Date(), 14),
        addDays(new Date(), 21),
        addDays(new Date(), 28),
        addDays(new Date(), 31),
        addDays(new Date(), 40),
      ],
    },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const Calendar: Story<CalendarProps> = ({
  loading,
  onSelect,
  availableDates,
  weekStartsOn,
}) => {
  return (
    <div style={{ padding: '2rem' }}>
      <CalendarComponent
        onSelect={onSelect}
        loading={loading}
        availableDates={availableDates}
        weekStartsOn={weekStartsOn}
      />
    </div>
  )
}
