/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { WizardForm as WizardFormComponent } from '.'
import { form } from '../../fixtures'

export default {
  title: 'organisms/WizardForm',
  component: WizardFormComponent,
  displayName: 'WizardForm',
}

const wizardFormItems = [
  {
    id: '0',
    label: 'Send documentation to patient',
  },
  {
    id: '1',
    label: 'Confirm testing availability',
  },
  {
    id: '2',
    label: 'Ensure documentation is signed',
  },
]

export const WizardForm: Story = ({}) => {
  return <WizardFormComponent form={form} />
}

WizardForm.args = {
  labels: {
    title: 'My WizardForm',
    buttonSubmit: 'Submit',
    buttonCompleted: 'Submitted',
  },
  onItemUpdated: action(`item updated`),
  onSubmit: action('submitted'),
}
