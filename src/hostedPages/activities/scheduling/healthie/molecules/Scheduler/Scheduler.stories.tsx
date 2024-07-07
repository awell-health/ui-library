import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Scheduler as SchedulerComponent, SchedulerProps } from './Scheduler'
import { ThemeProvider } from '../../../../../../atoms'
import { useTimezone } from '../../../../../../hooks'

export default {
  title: 'HostedPages/Activities/Scheduling/Healthie/Molecules/Scheduler',
  component: SchedulerComponent,
  argTypes: {
    appointmentName: {
      control: 'text',
      defaultValue: 'Initial Consultation',
    },
    appointmentLength: {
      control: 'number',
      defaultValue: 60,
    },
    appointmentCallType: {
      control: 'text',
      defaultValue: 'Video Call',
    },
    availableSlots: {
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
    onDateSelect: { action: 'dateSelected' },
    onSlotSelect: { action: 'slotSelected' },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const Scheduler: Story<SchedulerProps> = ({
  appointmentName,
  appointmentLength,
  appointmentCallType,
  availableSlots,
  loadingAvailableDays,
  loadingAvailableSlots,
  onDateSelect,
  onSlotSelect,
}) => {
  const timeZone = useTimezone()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedSlot, setSelectedSlot] = useState<Date | undefined>(undefined)

  return (
    <div style={{ padding: '2rem' }}>
      <SchedulerComponent
        appointmentName={appointmentName}
        appointmentLength={appointmentLength}
        appointmentCallType={appointmentCallType}
        availableSlots={availableSlots?.map((d) => new Date(d))}
        loadingAvailableDays={loadingAvailableDays}
        loadingAvailableSlots={loadingAvailableSlots}
        date={selectedDate}
        slot={selectedSlot}
        timeZone={timeZone}
        onDateSelect={(d) => {
          setSelectedDate(d)
          onDateSelect(d)
        }}
        onSlotSelect={(d) => {
          setSelectedSlot(d)
          onSlotSelect(d)
        }}
      />
    </div>
  )
}
