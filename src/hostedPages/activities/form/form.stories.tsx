import { action } from '@storybook/addon-actions'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { ConversationalForm as ConversationalFormComponent } from '.'
import { ThemeProvider } from '../../../atoms'
import { form } from '../../../constants/formFixture'
import { HostedPageLayout } from '../../layouts/HostedPageLayout'
import { TraditionalForm as TraditionalFormComponent } from './TraditionalForm'

export default {
  title: 'HostedPages/Activities',
  component: ConversationalFormComponent,
  displayName: 'Form',

  argTypes: {
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      action('submitted')
    },
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
    displayMode: {
      options: ['traditional', 'conversational'],
      control: { type: 'radio' },
      defaultValue: 'conversational',
    },
    errorLabels: {
      control: 'object',
      defaultValue: {
        required: 'Answer for this question is required',
        sliderNotTouched: 'Slider is not touched',
        invalidPhoneNumber: 'Please enter a valid phone number',
        formHasErrors: 'Please fix the errors in the form before submitting',
      },
    },
    autoProgress: {
      options: [true, false],
      control: { type: 'radio' },
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

const MyStory: Story = ({
  onSubmit,
  form,
  buttonLabels,
  displayMode,
  autoProgress,
  errorLabels,
}) => {
  const [answers, setAnswers] = React.useState<string>('')
  const isConversationalMode = displayMode == 'conversational'

  const handleAnswersChange = (answers: string) => {
    setAnswers(answers)
  }

  return (
    <HostedPageLayout
      onCloseHostedPage={() => alert('Stop session')}
      hideCloseButton
      logo={undefined}
    >
      {isConversationalMode ? (
        <ConversationalFormComponent
          form={form}
          buttonLabels={buttonLabels}
          errorLabels={errorLabels}
          onSubmit={onSubmit}
          storedAnswers={answers}
          onAnswersChange={handleAnswersChange}
          key={form.id}
          questionLabels={{
            no_label: 'No',
            yes_label: 'Yes',
            select: {
              no_options: 'No options',
              search_placeholder: 'Search',
            },
            slider: {
              tooltip_guide: 'Touch to select a value',
            },
          }}
          evaluateDisplayConditions={async (response) => {
            await new Promise((resolve) => setTimeout(resolve, 1500))

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
          autoProgress={autoProgress}
        />
      ) : (
        <TraditionalFormComponent
          form={form}
          buttonLabels={buttonLabels}
          errorLabels={errorLabels}
          onSubmit={onSubmit}
          storedAnswers={answers}
          onAnswersChange={handleAnswersChange}
          key={form.id}
          questionLabels={{
            no_label: 'No',
            yes_label: 'Yes',
            select: {
              no_options: 'No options',
              search_placeholder: 'Search',
            },
            slider: {
              tooltip_guide: 'Touch to select a value',
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
      )}
    </HostedPageLayout>
  )
}

export const Form: Story = ({
  onSubmit,
  form,
  buttonLabels,
  displayMode,
  errorLabels,
  autoProgress,
}) => {
  return (
    <MyStory
      onSubmit={onSubmit}
      form={form}
      displayMode={displayMode}
      buttonLabels={buttonLabels}
      errorLabels={errorLabels}
      autoProgress={autoProgress}
    />
  )
}

Form.args = {
  labels: {
    title: 'My WizardForm',
    buttonSubmit: 'Submit',
    buttonCompleted: 'Submitted',
  },
  onSubmit: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    action('submitted')
  },
}

Form.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const FormMobile: Story = ({
  onSubmit,
  form,
  buttonLabels,
  displayMode,
  errorLabels,
}) => {
  return (
    <MyStory
      onSubmit={onSubmit}
      form={form}
      displayMode={displayMode}
      buttonLabels={buttonLabels}
      errorLabels={errorLabels}
    />
  )
}

FormMobile.args = {
  labels: {
    title: 'My WizardForm',
    buttonSubmit: 'Submit',
    buttonCompleted: 'Submitted',
  },
  onSubmit: action('submitted'),
}

FormMobile.parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
}
