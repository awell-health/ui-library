import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  AppointmentTypeOverview as AppointmentTypeOverviewComponent,
  AppointmentTypeOverviewProps,
} from './AppointmentTypeOverview'
import { ThemeProvider } from '../../../../../../atoms'

export default {
  title:
    'HostedPages/Activities/Scheduling/Healthie/Atoms/AppointmentTypeOverview',
  component: AppointmentTypeOverviewComponent,
  argTypes: {
    bookedSlot: {
      control: 'date',
      defaultValue: new Date(),
    },
    name: {
      control: 'text',
      defaultValue: 'Initial Consultation',
    },
    length: {
      control: 'number',
      defaultValue: 45,
    },
    contactType: {
      control: 'text',
      defaultValue: 'Video Call',
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

export const AppointmentTypeOverview: Story<AppointmentTypeOverviewProps> = ({
  bookedSlot,
  name,
  length,
  contactType,
}) => {
  return (
    <div style={{ padding: '2rem' }}>
      <AppointmentTypeOverviewComponent
        bookedSlot={bookedSlot}
        name={name}
        length={length}
        contactType={contactType}
      />
    </div>
  )
}
