import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { WizardForm as WizardFormComponent } from '.'
import { form } from '../../constants/fixtures'

export default {
  title: 'organisms/WizardForm',
  component: WizardFormComponent,
  displayName: 'WizardForm',
}

export const WizardForm: Story = ({}) => {
  return (
    <WizardFormComponent
      form={form}
      onSubmit={() => alert('form submit button clicked')}
    />
  )
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
