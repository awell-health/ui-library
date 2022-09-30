import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { WizardForm as WizardFormComponent } from '.'
import { form as formData } from '../../constants/formFixture'
import { ThemeProvider } from '../../atoms'

export default {
  title: 'organisms/WizardForm',
  component: WizardFormComponent,
  displayName: 'WizardForm',

  argTypes: {
    onSubmit: { action: 'submitted' },
    form: {
      control: 'object',
      defaultValue: formData,
    },
    buttonLabels: {
      control: 'object',
      defaultValue: {
        prev: 'Prev',
        next: 'Next',
        submit: 'Submit',
        start_form: 'Start form'
      },
    },
    errorLabels: {
      control: 'object',
      defaultValue: {
        required: 'Answer for this question is required',
      },
    },
  },
}

export const WizardForm: Story = ({
  onSubmit,
  form,
  buttonLabels,
  errorLabels,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <WizardFormComponent
        form={form}
        buttonLabels={buttonLabels}
        errorLabels={errorLabels}
        onSubmit={onSubmit}
        evaluateDisplayConditions={() => {
          return Promise.all([]).then(function () {
            return []
          })
        }}
      />
    </ThemeProvider>
  )
}

WizardForm.args = {
  labels: {
    title: 'My WizardForm',
    buttonSubmit: 'Submit',
    buttonCompleted: 'Submitted',
  },
  onSubmit: action('submitted'),
}

WizardForm.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
