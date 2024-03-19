import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { CalDotcomActivity as CalDotcomActivityComponent } from './CalDotcomActivity'
import { CalDotComActivityProps } from './types'
import { ThemeProvider } from '../../../../atoms'
import { HostedPageLayout } from '../../../layouts/HostedPageLayout/HostedPageLayout'

export default {
  title: 'HostedPages/Activities/Scheduling/CalDotCom',
  component: CalDotcomActivityComponent,
  argTypes: {
    calLink: {
      control: 'text',
      defaultValue: 'nick-hellemans-k1brip/15min',
    },
    hideEventTypeDetails: {
      control: 'boolean',
      defaultValue: false,
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

export const CalDotComActivity: Story<CalDotComActivityProps> = ({
  calLink,
  hideEventTypeDetails,
}) => {
  return (
    <HostedPageLayout
      logo={'/static/media/src/assets/logo.svg'}
      onCloseHostedPage={() => alert('Stop session')}
    >
      <CalDotcomActivityComponent
        calLink={calLink}
        onBookingSuccessful={() => alert('hey')}
        hideEventTypeDetails={hideEventTypeDetails}
      />
    </HostedPageLayout>
  )
}
