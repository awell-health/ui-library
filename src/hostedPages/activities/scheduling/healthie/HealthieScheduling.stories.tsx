import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { AppointmentTypes, Stepper } from './atoms'
import { ThemeProvider } from '../../../../atoms'
import { HostedPageLayout } from '../../../layouts/HostedPageLayout/HostedPageLayout'
import { Scheduler } from './molecules/Scheduler/Scheduler'

export default {
  title: 'HostedPages/Activities/Scheduling/Healthie',
  argTypes: {
    steps: {
      control: 'array',
      defaultValue: [
        {
          id: 'Step 1',
          name: 'Select appointment',
          href: '#',
          status: 'current',
        },
        {
          id: 'Step 2',
          name: 'Select date and time',
          href: '#',
          status: 'upcoming',
        },
        {
          id: 'Step 3',
          name: 'Your information',
          href: '#',
          status: 'upcoming',
        },
      ],
    },
    appointmentTypes: {
      control: 'array',
      defaultValue: [
        {
          id: '54454',
          name: 'Initial Consultation',
          length: 60,
          disabled: false,
          availableContactTypes: ['Healthie Video Call', 'Phone Call'],
        },
        {
          id: '54455',
          name: 'Follow-up Session',
          length: 45,
          disabled: false,
          availableContactTypes: ['Healthie Video Call', 'Phone Call'],
        },
        {
          id: '54456',
          name: 'Group Session',
          length: 45,
          disabled: true,
          availableContactTypes: ['Phone Call'],
        },
        {
          id: '66891',
          name: 'Regular visit',
          length: 30,
          disabled: false,
          availableContactTypes: ['Healthie Video Call'],
        },
      ],
    },
    onAppointmentSelect: { action: 'appointmentSelected' },
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

export const HealthieSchedulingActivity: Story = ({
  steps: initialSteps,
  appointmentTypes,
  onAppointmentSelect,
  onDateSelect,
  onSlotSelect,
}) => {
  const [steps, setSteps] = useState(initialSteps)
  const [selectedAppointment, setSelectedAppointment] = useState<
    string | undefined
  >(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedSlot, setSelectedSlot] = useState<Date | undefined>(undefined)

  const updateStepStatus = (stepId: string) => {
    const updatedSteps = steps.map((step) => {
      if (step.id === stepId) {
        return { ...step, status: 'current' }
      } else if (
        steps.findIndex((s) => s.id === step.id) <
        steps.findIndex((s) => s.id === stepId)
      ) {
        return { ...step, status: 'complete' }
      } else {
        return { ...step, status: 'upcoming' }
      }
    })

    setSteps(updatedSteps)
  }

  const handleAppointmentSelect = (id: string) => {
    updateStepStatus('Step 2')
    setSelectedAppointment(id)
    onAppointmentSelect(id)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    onDateSelect(date)
  }

  const handleSlotSelect = (date: Date) => {
    updateStepStatus('Step 3')
    setSelectedSlot(date)
    onSlotSelect(date)
  }

  return (
    <HostedPageLayout
      logo={
        'https://res.cloudinary.com/da7x4rzl4/image/upload/v1710884206/Developer%20portal/awell_logo.svg'
      }
      onCloseHostedPage={() => alert('Stop session')}
    >
      <div
        style={{
          padding: '0 2rem',
          width: '100%',
          maxWidth: '1040px',
          margin: '0 auto',
        }}
      >
        <Stepper steps={steps} onStepClick={updateStepStatus} />

        <div style={{ marginTop: '2rem' }}>
          {steps[0].status === 'current' && (
            <AppointmentTypes
              value={selectedAppointment}
              appointmentTypes={appointmentTypes}
              onSelect={handleAppointmentSelect}
            />
          )}

          {steps[1].status === 'current' && (
            <Scheduler
              // @ts-ignore it's okay
              appointmentName={
                appointmentTypes.find((a) => a.id === selectedAppointment).name
              }
              // @ts-ignore it's okay
              appointmentLength={
                appointmentTypes.find((a) => a.id === selectedAppointment)
                  .length
              }
              // @ts-ignore it's okay
              appointmentCallType={
                appointmentTypes.find((a) => a.id === selectedAppointment)
                  .availableContactTypes[0]
              }
              date={selectedDate}
              slot={selectedSlot}
              onDateSelect={handleDateSelect}
              onSlotSelect={handleSlotSelect}
            />
          )}

          {steps[2].status === 'current' && (
            <div>Todo: form to insert information</div>
          )}
        </div>
      </div>
    </HostedPageLayout>
  )
}
