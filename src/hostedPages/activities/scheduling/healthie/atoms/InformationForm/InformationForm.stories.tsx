import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  InformationForm as InformationFormComponent,
  InformationFormProps,
} from './InformationForm'
import { ThemeProvider } from '../../../../../../atoms'

export default {
  title: 'HostedPages/Activities/Scheduling/Healthie/Atoms/InformationForm',
  component: InformationFormComponent,
  argTypes: {
    firstName: {
      control: 'text',
      defaultValue: 'Nick',
    },
    lastName: {
      control: 'text',
      defaultValue: 'Hellemans',
    },
    email: {
      control: 'text',
      defaultValue: 'nick@awellhealth.com',
    },
    phoneNumber: {
      control: 'text',
      defaultValue: '+32476581696',
    },
    reason: {
      control: 'text',
      defaultValue: 'Not feeling so well',
    },
    onSubmit: { action: 'submitted' },
  },
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const InformationForm: Story<InformationFormProps> = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  reason,
  onSubmit,
}) => {
  return (
    <div style={{ padding: '2rem' }}>
      <InformationFormComponent
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
        email={email}
        reason={reason}
        onSubmit={onSubmit}
      />
    </div>
  )
}
