import React, { useEffect, useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  AppointmentTypeOverview,
  AppointmentTypes,
  InformationForm,
  useInformationForm,
} from './atoms'
import {
  ThemeProvider,
  Stepper,
  useTheme,
  CircularSpinner,
} from '../../../../atoms'
import { HostedPageLayout } from '../../../layouts/HostedPageLayout/HostedPageLayout'
import { Scheduler } from './molecules/Scheduler/Scheduler'
import { useTimezone } from '../../../../hooks'
import { addDays, isSameDay } from 'date-fns'
import { FormBookingValues } from './atoms/InformationForm/InformationForm'

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
    onAppointmentSelect: { action: 'appointmentSelected' },
    onDateSelect: { action: 'dateSelected' },
    onSlotSelect: { action: 'slotSelected' },
    onBooking: { action: 'confirmBooking' },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

const mockFetchAppointmentTypes = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
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
        ]),
      750
    )
  )

const mockFetchAvailableDays = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          addDays(new Date(), 1),
          addDays(new Date(), 7),
          addDays(new Date(), 14),
        ]),
      750
    )
  )

const mockFetchAvailableSlots = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          '2024-07-12 00:00:00 +0200',
          '2024-07-12 00:15:00 +0200',
          '2024-07-12 00:30:00 +0200',
          '2024-07-12 00:45:00 +0200',
          '2024-07-12 01:00:00 +0200',
          '2024-07-12 01:15:00 +0200',
          '2024-07-12 01:30:00 +0200',
        ]),
      750
    )
  )

const mockBookAppointment = () =>
  new Promise((resolve) => setTimeout(() => resolve(true), 1500))

export const HealthieSchedulingActivity: Story = ({
  steps: initialSteps,
  onAppointmentSelect,
  onDateSelect,
  onSlotSelect,
  onBooking,
}) => {
  const { updateLayoutMode, resetLayoutMode } = useTheme()
  const timeZone = useTimezone()

  const [steps, setSteps] = useState(initialSteps)

  const [appointmentTypes, setAppointmentTypes] = useState([])
  const [availableDays, setAvailableDays] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [loadingAppointmentTypes, setLoadingAppointmentTypes] = useState(true)
  const [loadingAvailableDays, setLoadingAvailableDays] = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [loadingConfirmation, setLoadingConfirmation] = useState(false)

  const [selectedAppointment, setSelectedAppointment] = useState<
    string | undefined
  >(undefined)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedSlot, setSelectedSlot] = useState<Date | undefined>(undefined)

  const initialValues: FormBookingValues = {
    firstName: 'Nick',
    lastName: 'Hellemans',
    email: 'nick@awellhealth.com',
    phoneNumber: '+32476581696',
    reason: '',
  }

  const { formValues, errors, handleChange, validate } =
    useInformationForm(initialValues)

  useEffect(() => {
    updateLayoutMode('flexible')

    mockFetchAppointmentTypes().then((types) => {
      //@ts-expect-error this is fine for the story
      setAppointmentTypes(types)
      setLoadingAppointmentTypes(false)
    })

    return () => {
      // Reset to default mode on unmount
      resetLayoutMode()
    }
  }, [])

  const updateStepStatus = (stepId: string) => {
    // @ts-expect-error it's okay
    const updatedSteps = steps.map((step) => {
      if (step.id === stepId) {
        return { ...step, status: 'current' }
      } else if (
        // @ts-expect-error it's okay
        steps.findIndex((s) => s.id === step.id) <
        // @ts-expect-error it's okay
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
    setLoadingAvailableDays(true)

    updateStepStatus('Step 2')
    setSelectedAppointment(id)
    onAppointmentSelect(id)

    mockFetchAvailableDays().then((days) => {
      //@ts-expect-error this is fine for the story
      setAvailableDays(days)
      setLoadingAvailableDays(false)
    })
  }

  const handleDateSelect = (date: Date) => {
    setAvailableSlots([])
    setLoadingSlots(true)
    setSelectedDate(date)
    onDateSelect(date)

    mockFetchAvailableSlots().then((slots) => {
      const isAvailable = (date: Date) => {
        return availableDays.some((availableDate) =>
          isSameDay(date, availableDate)
        )
      }

      //@ts-expect-error this is fine for the story
      if (isAvailable(date)) setAvailableSlots(slots)
      setLoadingSlots(false)
    })
  }

  const handleSlotSelect = (date: Date) => {
    updateStepStatus('Step 3')
    setSelectedSlot(date)
    onSlotSelect(date)
  }

  const handleBooking = (data: FormBookingValues) => {
    setLoadingConfirmation(true)
    onBooking(data)

    mockBookAppointment().then(() => {
      setLoadingConfirmation(false)
      alert('Show confirmation and button to complete activity')
    })
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

        <div style={{ marginTop: '3rem', marginBottom: '1rem' }}>
          {steps[0].status === 'current' && (
            <>
              {loadingAppointmentTypes ? (
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                  <CircularSpinner size="sm" />
                </div>
              ) : (
                <AppointmentTypes
                  value={selectedAppointment}
                  appointmentTypes={appointmentTypes}
                  onSelect={handleAppointmentSelect}
                />
              )}
            </>
          )}

          {steps[1].status === 'current' && (
            <Scheduler
              appointmentName={
                // @ts-expect-error it's okay
                appointmentTypes.find((a) => a.id === selectedAppointment).name
              }
              appointmentLength={
                // @ts-expect-error it's okay
                appointmentTypes.find((a) => a.id === selectedAppointment)
                  .length
              }
              appointmentCallType={
                // @ts-expect-error it's okay
                appointmentTypes.find((a) => a.id === selectedAppointment)
                  .availableContactTypes[0]
              }
              loadingAvailableDays={loadingAvailableDays}
              loadingAvailableSlots={loadingSlots}
              availableDays={availableDays}
              availableSlots={availableSlots?.map((d) => new Date(d))}
              timeZone={timeZone}
              date={selectedDate}
              slot={selectedSlot}
              onDateSelect={handleDateSelect}
              onSlotSelect={handleSlotSelect}
            />
          )}

          {steps[2].status === 'current' && (
            <>
              {loadingConfirmation ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularSpinner size="sm" />
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '30%' }}>
                    <AppointmentTypeOverview
                      bookedSlot={selectedSlot}
                      name={
                        // @ts-expect-error it's okay
                        appointmentTypes.find(
                          // @ts-expect-error it's okay
                          (a) => a.id === selectedAppointment
                        ).name
                      }
                      length={
                        // @ts-expect-error it's okay
                        appointmentTypes.find(
                          // @ts-expect-error it's okay
                          (a) => a.id === selectedAppointment
                        ).length
                      }
                      contactType={
                        // @ts-expect-error it's okay
                        appointmentTypes.find(
                          // @ts-expect-error it's okay
                          (a) => a.id === selectedAppointment
                        ).availableContactTypes[0]
                      }
                    />
                  </div>
                  <div style={{ width: '70%' }}>
                    <InformationForm
                      firstName={formValues.firstName}
                      lastName={formValues.lastName}
                      email={formValues.email}
                      phoneNumber={formValues.phoneNumber}
                      onSubmit={(values) => {
                        if (validate()) {
                          handleBooking(values)
                        }
                      }}
                      text={{ submitButtonLabel: 'Book appointment' }}
                      errors={errors}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </HostedPageLayout>
  )
}
