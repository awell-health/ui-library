import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Slots as SlotsComponent, SlotsProps } from './Slots'
import { ThemeProvider } from '../../../../../../atoms'

export default {
  title: 'HostedPages/Activities/Scheduling/Healthie/Atoms/Slots',
  component: SlotsComponent,
  argTypes: {
    slotDate: {
      control: 'date',
      defaultValue: new Date(),
    },
    slots: {
      control: 'array',
      defaultValue: [
        '2025-07-10T22:00:00.000Z',
        '2025-07-10T22:15:00.000Z',
        '2025-07-10T22:30:00.000Z',
        '2025-07-10T22:45:00.000Z',
        '2025-07-10T23:00:00.000Z',
        '2025-07-10T23:15:00.000Z',
        '2025-07-10T23:30:00.000Z',
        '2025-07-10T23:45:00.000Z',
      ],
    },
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

export const Slots: Story<SlotsProps> = ({ slotDate, slots, onSelect }) => {
  return (
    <div style={{ padding: '2rem' }}>
      <SlotsComponent
        slotDate={slotDate}
        slots={slots.map((s) => new Date(s))}
        onSelect={onSelect}
      />
    </div>
  )
}
