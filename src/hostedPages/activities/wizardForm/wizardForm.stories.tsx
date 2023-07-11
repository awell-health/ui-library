import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { WizardForm as WizardFormComponent } from '.'
import { form } from './__testdata__/testFormFixture'
import { HostedPageLayout } from '../../layouts/HostedPageLayout'
import { ThemeProvider } from '../../../atoms'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport/preview'

export default {
  title: 'HostedPages/Activities',
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
        skip: 'Skip',
      },
    },
    errorLabels: {
      control: 'object',
      defaultValue: {
        required: 'Answer for this question is required',
        sliderNotTouched: 'Slider is not touched',
        invalidPhoneNumber: 'Please enter a valid phone number',
      },
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

export const WizardForm: Story = ({
  onSubmit,
  form,
  buttonLabels,
  errorLabels,
}) => {
  const [answers, setAnswers] = React.useState<string>('')
  const handleAnswersChange = (answers: string) => {
    setAnswers(answers)
  }

  return (
    <HostedPageLayout
      onCloseHostedPage={() => alert('Stop session')}
      hideCloseButton
    >
      <WizardFormComponent
        form={form}
        buttonLabels={buttonLabels}
        errorLabels={errorLabels}
        onSubmit={onSubmit}
        storedAnswers={answers}
        onAnswersChange={handleAnswersChange}
        key={form.id}
        questionTypeConfig={{
          TELEPHONE: {
            initialCountry: 'gb',
            placeholder: '+447810123456',
          },
        }}
        questionLabels={{
          no_label: 'No',
          yes_label: 'Yes',
          select: {
            no_options: 'No options',
            search_placeholder: 'Search',
          },
        }}
        evaluateDisplayConditions={async (response) => {
          action('evaluateDisplayConditions')(response)
          return Promise.all([]).then(function () {
            const numberQ = response.find(
              // this is the 9th question in ./__testdata__/testFormFixture.ts
              (r) => r.question_id === '5KMcDYtoz0rr'
            )
            // the 9th (short text) question's visibility depends on the answer
            // of the number question (just prior, 8th) being greater than 10
            return [
              {
                question_id: 'U99uUQ_Jp5Jb',
                rule_id: '',
                satisfied: Number(numberQ?.value ?? '0') > 10,
              },
            ]
          })
        }}
      />
    </HostedPageLayout>
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

export const WizardFormMobile: Story = ({
  onSubmit,
  form,
  buttonLabels,
  errorLabels,
}) => {
  const [answers, setAnswers] = React.useState<string>('')
  const handleAnswersChange = (answers: string) => {
    setAnswers(answers)
  }

  return (
    <HostedPageLayout
      onCloseHostedPage={() => alert('Stop session')}
      hideCloseButton
    >
      <WizardFormComponent
        form={form}
        buttonLabels={buttonLabels}
        errorLabels={errorLabels}
        onSubmit={onSubmit}
        storedAnswers={answers}
        onAnswersChange={handleAnswersChange}
        key={form.id}
        questionTypeConfig={{
          TELEPHONE: {
            initialCountry: 'gb',
            placeholder: '+447810123456',
          },
        }}
        questionLabels={{
          no_label: 'No',
          yes_label: 'Yes',
          select: {
            no_options: 'No options',
            search_placeholder: 'Search',
          },
        }}
        evaluateDisplayConditions={async (response) => {
          action('evaluateDisplayConditions')(response)
          return Promise.all([]).then(function () {
            return []
          })
        }}
      />
    </HostedPageLayout>
  )
}

WizardFormMobile.args = {
  labels: {
    title: 'My WizardForm',
    buttonSubmit: 'Submit',
    buttonCompleted: 'Submitted',
  },
  onSubmit: action('submitted'),
}

WizardFormMobile.parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
}
