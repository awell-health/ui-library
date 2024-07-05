import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  AppointmentTypes as AppointmentTypesComponent,
  AppointmentTypesProps,
} from './AppointmentTypes'
import { ThemeProvider } from '../../../../../../atoms'

export default {
  title: 'HostedPages/Activities/Scheduling/Healthie/Atoms/AppointmentTypes',
  component: AppointmentTypesComponent,
  argTypes: {
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

export const AppointmentTypes: Story<AppointmentTypesProps> = ({
  appointmentTypes,
  onSelect,
}) => {
  return (
    <div style={{ padding: '2rem' }}>
      <AppointmentTypesComponent
        appointmentTypes={appointmentTypes}
        onSelect={onSelect}
      />
    </div>
  )
}
