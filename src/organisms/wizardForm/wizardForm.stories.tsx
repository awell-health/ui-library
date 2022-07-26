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
      buttonLabels={{
        prev: 'Prev',
        next: 'Next',
        submit: 'Submit',
      }}
      errorLabels={{ required: 'Answer for this question is required' }}
      onSubmit={() => alert('form submit button clicked')}
      evaluateDisplayConditions={() => {
        return Promise.all([]).then(function () {
          return []
        })
      }}
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
