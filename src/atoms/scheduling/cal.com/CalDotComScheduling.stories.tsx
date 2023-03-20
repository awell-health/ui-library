import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { ThemeProvider } from '../../themeProvider'
import {
  CalDotComScheduling as CalDotComSchedulingComponent,
  CalDotComSchedulingProps,
} from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Atoms/Scheduling/Cal.com',
  component: CalDotComSchedulingComponent,
  argTypes: {
    calLink: {
      control: 'text',
      defaultValue: 'nick-hellemans-k1brip/15min',
    },
    onBookingSuccessful: { action: 'bookingSuccessful' },
    hideEventTypeDetails: {
      control: 'boolean',
      defaultValue: false,
    },
    metadata: {
      control: 'object',
      defaultValue: {
        awellPatientId: 'ABC',
        awellPathwayId: 'DEF',
        awellActivityId: 'GHI',
      },
    },
  },
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const CalDotComScheduling: Story<CalDotComSchedulingProps> = ({
  calLink,
  onBookingSuccessful,
  hideEventTypeDetails,
  metadata,
}) => {
  return (
    <CalDotComSchedulingComponent
      calLink={calLink}
      onBookingSuccessful={onBookingSuccessful}
      hideEventTypeDetails={hideEventTypeDetails}
      metadata={metadata}
    />
  )
}
