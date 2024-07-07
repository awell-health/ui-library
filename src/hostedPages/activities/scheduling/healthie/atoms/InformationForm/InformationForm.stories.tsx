import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import {
  FormBookingValues,
  InformationForm as InformationFormComponent,
  InformationFormProps,
} from './InformationForm'
import { ThemeProvider } from '../../../../../../atoms'
import { useInformationForm } from './useInformationForm'

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
  const initialValues: FormBookingValues = {
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    email: email ?? '',
    phoneNumber: phoneNumber ?? '',
    reason: reason ?? '',
  }

  const { formValues, errors, handleChange, validate } =
    useInformationForm(initialValues)

  const handleSubmit = (values: FormBookingValues) => {
    if (validate()) {
      onSubmit(values)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <InformationFormComponent
        firstName={formValues.firstName}
        lastName={formValues.lastName}
        phoneNumber={formValues.phoneNumber}
        email={formValues.email}
        reason={formValues.reason}
        onSubmit={handleSubmit}
        onChange={handleChange}
        errors={errors}
      />
    </div>
  )
}
