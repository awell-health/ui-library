import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  AppointmentTypes,
  Stepper,
  type StepperProps,
  AppointmentTypesProps,
} from './atoms'
import { ThemeProvider } from '../../../../atoms'
import { HostedPageLayout } from '../../../layouts/HostedPageLayout/HostedPageLayout'

export default {
  title: 'HostedPages/Activities/Scheduling/Healthie',
  argTypes: {
    steps: {
      control: 'array',
      defaultValue: [
        {
          id: 'Step 1',
          name: 'Appointment type',
          href: '#',
          status: 'current',
        },
        {
          id: 'Step 2',
          name: 'Select date and time',
          href: '#',
          status: 'upcoming',
        },
        { id: 'Step 3', name: 'Confirmation', href: '#', status: 'upcoming' },
      ],
    },
    appointmentTypes: {
      control: 'array',
      defaultValue: [
        {
          id: '54454',
          name: 'Initial Consultation',
          length: 60,
          clients_have_credit: true,
          client_call_provider: false,
          availability_exists_for: true,
          valid_state_licensing_for: true,
          available_contact_types: ['Healthie Video Call', 'Phone Call'],
          is_group: false,
          is_waitlist_enabled: false,
          require_in_state_clients: false,
          has_available_group_appts: null,
          __typename: 'AppointmentType',
        },
        {
          id: '54455',
          name: 'Follow-up Session',
          length: 45,
          clients_have_credit: true,
          client_call_provider: false,
          availability_exists_for: true,
          valid_state_licensing_for: true,
          available_contact_types: ['Healthie Video Call', 'Phone Call'],
          is_group: false,
          is_waitlist_enabled: false,
          require_in_state_clients: false,
          has_available_group_appts: null,
          __typename: 'AppointmentType',
        },
        {
          id: '54456',
          name: 'Group Session',
          length: 45,
          clients_have_credit: true,
          client_call_provider: false,
          availability_exists_for: false,
          valid_state_licensing_for: true,
          available_contact_types: ['Healthie Video Call', 'Phone Call'],
          is_group: true,
          is_waitlist_enabled: false,
          require_in_state_clients: false,
          has_available_group_appts: null,
          __typename: 'AppointmentType',
        },
        {
          id: '66891',
          name: 'Regular visit',
          length: 30,
          clients_have_credit: true,
          client_call_provider: false,
          availability_exists_for: true,
          valid_state_licensing_for: true,
          available_contact_types: ['Healthie Video Call', 'Phone Call'],
          is_group: false,
          is_waitlist_enabled: false,
          require_in_state_clients: false,
          has_available_group_appts: null,
          __typename: 'AppointmentType',
        },
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

export const HealthieSchedulingActivity: Story = ({
  steps,
  appointmentTypes,
}) => {
  return (
    <HostedPageLayout
      logo={
        'https://res.cloudinary.com/da7x4rzl4/image/upload/v1710884206/Developer%20portal/awell_logo.svg'
      }
      onCloseHostedPage={() => alert('Stop session')}
    >
      <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        <Stepper steps={steps} />

        <div style={{ marginTop: '2rem' }}>
          <AppointmentTypes appointmentTypes={appointmentTypes} />
        </div>
      </div>
    </HostedPageLayout>
  )
}
