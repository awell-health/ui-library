import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { WizardForm as WizardFormComponent } from '.'
import { form } from './__testdata__/testFormFixture'
import { ThemeProvider } from '../../../atoms'
import { HostedPageLayout } from '../../layouts/HostedPageLayout/HostedPageLayout'

export default {
  title: 'HostedPages/Activities/WizardForm',
  component: WizardFormComponent,
  displayName: 'WizardForm',

  argTypes: {
    onSubmit: { action: 'submitted' },
    form: {
      control: 'object',
      defaultValue: form,
    },
    buttonLabels: {
      control: 'object',
      defaultValue: {
        prev: 'Prev',
        next: 'Next',
        submit: 'Submit',
        start_form: 'Start form',
      },
    },
    errorLabels: {
      control: 'object',
      defaultValue: {
        required: 'Answer for this question is required',
        sliderNotTouched: 'Slider is not touched',
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
      <div style={{ minHeight: '90vh', position: 'relative' }}>
        <HostedPageLayout onCloseHostedPage={() => alert('Stop session')}>
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
        </HostedPageLayout>
      </div>
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
