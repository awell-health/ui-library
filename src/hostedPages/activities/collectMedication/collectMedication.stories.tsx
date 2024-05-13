import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { ThemeProvider } from '../../../atoms'
import { HostedPageLayout } from '../../layouts/HostedPageLayout/HostedPageLayout'
import { CollectMedication as CollectMedicationComponent } from './CollectMedication'
import { CollectMedicationProps } from './types'

export default {
  title: 'HostedPages/Activities/CollectMedication',
  component: CollectMedicationComponent,
  argTypes: {
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

export const CollectMedication: Story<CollectMedicationProps> = ({
  onSubmit,
}) => {
  return (
    <HostedPageLayout
      logo={
        'https://res.cloudinary.com/da7x4rzl4/image/upload/v1710884206/Developer%20portal/awell_logo.svg'
      }
      onCloseHostedPage={() => alert('Stop session')}
    >
      <CollectMedicationComponent
        onSubmit={onSubmit}
        text={{
          medication_name: 'Name',
          medication_dose: 'Dose',
          medication_instructions: 'Instructions',
          add_medication_button: 'Add medication',
          submit_medication: 'Submit',
        }}
      />
    </HostedPageLayout>
  )
}

CollectMedication.parameters = {}
