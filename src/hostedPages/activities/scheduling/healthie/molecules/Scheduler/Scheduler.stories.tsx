import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Scheduler as SchedulerComponent, SchedulerProps } from './Scheduler'
import { ThemeProvider } from '../../../../../../atoms'

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
  onDateSelect,
  onSlotSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedSlot, setSelectedSlot] = useState<Date | undefined>(undefined)

  return (
    <div style={{ padding: '2rem' }}>
      <SchedulerComponent
        appointmentName={appointmentName}
        appointmentLength={appointmentLength}
        appointmentCallType={appointmentCallType}
        date={selectedDate}
        slot={selectedSlot}
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
