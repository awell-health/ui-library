import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Slots as SlotsComponent, SlotsProps } from './Slots'
import { ThemeProvider } from '../../../../../../atoms'
import { useTimezone } from '../../../../../../hooks'

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
        '2024-07-12 00:00:00 +0200',
        '2024-07-12 00:15:00 +0200',
        '2024-07-12 00:30:00 +0200',
        '2024-07-12 00:45:00 +0200',
        '2024-07-12 01:00:00 +0200',
        '2024-07-12 01:15:00 +0200',
        '2024-07-12 01:30:00 +0200',
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
  const timeZone = useTimezone()

  return (
    <div style={{ padding: '2rem' }}>
      <SlotsComponent
        slotDate={slotDate}
        slots={slots?.map((s) => new Date(s))}
        onSelect={onSelect}
        timeZone={timeZone}
      />
    </div>
  )
}
