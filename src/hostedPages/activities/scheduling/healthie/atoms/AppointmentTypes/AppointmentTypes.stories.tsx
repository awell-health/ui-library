import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  AppointmentTypes as AppointmentTypesComponent,
  AppointmentTypesProps,
} from './AppointmentTypes'
import { ThemeProvider } from '../../../../../../atoms'

export default {
  title: 'HostedPages/Activities/Scheduling/Healthie/AppointmentTypes',
  component: AppointmentTypesComponent,
  argTypes: {
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

export const AppointmentTypes: Story<AppointmentTypesProps> = ({
  appointmentTypes,
}) => {
  return (
    <div style={{ padding: '2rem' }}>
      <AppointmentTypesComponent appointmentTypes={appointmentTypes} />
    </div>
  )
}
