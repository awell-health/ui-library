import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import { WizardForm as WizardFormComponent } from './WizardForm'
import {
  form as formData,
  sliderQuestionForm,
  formWithTwoRequiredSingleSelectQuestions,
  dateQuestionForm,
  formHavingOneQuestionHiddenWithDisplayCondition,
} from './__testdata__/testFormFixture'
import { AnswerInput, Form } from '../../../types'
import { QuestionRuleResult } from '../../../hooks/useWizardForm/types'

const props = {
  buttonLabels: {
    prev: 'Prev',
    next: 'Next',
    submit: 'Submit',
  },
  errorLabels: {
    required: 'Answer for this question is required',
    sliderNotTouched: 'You did not move the slider',
    invalidPhoneNumber: 'Please enter a valid phone number',
  },
  evaluateDisplayConditionsTrue: () => {
    return Promise.all([]).then(function () {
      return []
    })
  },
}

/**
 * Makes it more readable in the tests
 */
const firstQuestion = formData.questions[0]
const secondQuestion = formData.questions[1]
// normalize labels by stripping out all newline characters
const normalizedFirstQuestionTitle = firstQuestion.title.replace('\n\n', ' ')
const normalizedSecondQuestionTitle = secondQuestion.title.replace('\n\n', ' ')
const { buttonLabels, errorLabels } = props

const renderWizardFormComponent = (
  form: Form,
  evaluateDisplayConditions: (
    response: AnswerInput[]
  ) => Promise<QuestionRuleResult[]>
) => {
  act(() => {
    render(
      <WizardFormComponent
        form={form}
        buttonLabels={buttonLabels}
        errorLabels={errorLabels}
        onSubmit={() => null}
        evaluateDisplayConditions={evaluateDisplayConditions}
      />
    )
  })
}

const clickNextButton = async () => {
  const nextButton = await screen.findByText(buttonLabels.next)
  await act(async () => {
    fireEvent.click(nextButton)
  })
}

const clickSubmitButton = async () => {
  const submitButton = await screen.findByText(buttonLabels.submit)
  await act(async () => {
    fireEvent.click(submitButton)
  })
}

const clickPrevButton = async () => {
  const prevButton = await screen.findByText(buttonLabels.prev)
  await act(async () => {
    fireEvent.click(prevButton)
  })
}

describe('Wizard form', () => {
  let evaluateDisplayConditions: (
    response: AnswerInput[]
  ) => Promise<QuestionRuleResult[]>

  beforeEach(() => {
    evaluateDisplayConditions = jest.fn().mockResolvedValue([])
  })

  it('Should render the first question and evaluate display condition on init', async () => {
    renderWizardFormComponent(formData, evaluateDisplayConditions)

    const firstQuestionLabel = await screen.findByText(
      normalizedFirstQuestionTitle
    )

    // Should evaluate display conditions once
    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(1)
    )
    // Form title should be present
    expect(firstQuestionLabel).toBeInTheDocument()
  })

  it('Should properly navigate to next question', async () => {
    renderWizardFormComponent(formData, evaluateDisplayConditions)

    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(1)
    )

    await clickNextButton()

    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(2)
    )

    const secondQuestionLabel = await screen.findByText(
      normalizedSecondQuestionTitle
    )

    const nextButton = await screen.findByText(props.buttonLabels.next)

    expect(secondQuestionLabel).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('Should properly navigate to previous question', async () => {
    renderWizardFormComponent(formData, evaluateDisplayConditions)

    // GO to 1st question
    await clickNextButton()

    // GO to 2nd question
    await clickNextButton()

    // Answer mandatory question
    const radioOption = await screen.findByLabelText('Option 1')
    expect(radioOption).not.toBeChecked()

    await act(async () => {
      // clicking on a select option moves to next question
      fireEvent.click(radioOption)
    })

    expect(radioOption).toBeChecked()

    // GO back to 2nd question
    await clickPrevButton()

    // GO back to 1st question
    await clickPrevButton()

    // Wait for the state updates to complete
    await waitFor(() =>
      expect(screen.getByText(normalizedFirstQuestionTitle)).toBeInTheDocument()
    )

    // Check if evaluate visibility conditions were called each time user
    // navigates to NEXT question + 1 on init
    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(5)
    )
  })

  it('Should properly navigate between required questions', async () => {
    renderWizardFormComponent(
      formWithTwoRequiredSingleSelectQuestions,
      evaluateDisplayConditions
    )

    // Try going to 2nd question without answering the first, required question
    await clickNextButton()
    const errorMessage = await screen.findByText(props.errorLabels.required)
    const firstQuestionTitle = await screen.findByText(
      formWithTwoRequiredSingleSelectQuestions.questions[0].title
    )
    expect(firstQuestionTitle).toBeInTheDocument()
    // This should throw an error as the current question is not answered and is required
    expect(errorMessage).toBeInTheDocument()

    // Answer the first question
    const radioOption = await screen.findByLabelText(
      'Answer the first required question'
    )
    expect(radioOption).not.toBeChecked()
    await act(async () => {
      // clicking on a select option moves to next question
      fireEvent.click(radioOption)
    })
    expect(radioOption).toBeChecked()

    // GO back to 1st question
    await clickPrevButton()

    // Try going to 2nd question again
    await clickNextButton()

    // Now we should see the 2nd question
    const secondQuestionTitle = await screen.findByText(
      formWithTwoRequiredSingleSelectQuestions.questions[1].title
    )
    expect(secondQuestionTitle).toBeInTheDocument()
  })

  it('Should not show an error message when user immediately presses next on slider question (because it has a default value)', async () => {
    renderWizardFormComponent(sliderQuestionForm, evaluateDisplayConditions)

    // Try to go to next question
    await clickNextButton()

    // Check if 2nd question is displayed
    const secondQuestionTitle = await screen.findByText(
      sliderQuestionForm.questions[1].title
    )

    expect(secondQuestionTitle).toBeInTheDocument()
  })

  it('Should show error message when user tries to skip required date question', async () => {
    renderWizardFormComponent(dateQuestionForm, evaluateDisplayConditions)

    // Try to go to next question
    await clickNextButton()

    //  check if error is present and page was not changes
    const questionTitleAfterClick = await screen.findByText(
      dateQuestionForm.questions[0].title
    )
    const errorMessage = await screen.findByText(props.errorLabels.required)

    expect(questionTitleAfterClick).toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
  })

  const evaluateDisplayConditionsForCarInput = (
    response: AnswerInput[]
  ): Promise<QuestionRuleResult[]> => {
    const carQuestionAnswer = response.find(
      (r) => r.question_id === 'VkL1vrscT5MV'
    )
    // hide the last question initially
    if (!carQuestionAnswer) {
      return Promise.resolve([
        {
          question_id: 'x5bgJqsOltmK3',
          satisfied: false,
          rule_id: 'some_rule_id',
        },
      ])
    }

    const { value: answer } = carQuestionAnswer

    // only show the last question when answer of first question is "yes"
    if (answer === '1') {
      return Promise.resolve([
        {
          question_id: 'x5bgJqsOltmK3',
          satisfied: true,
          rule_id: 'some_rule_id',
        },
      ])
    }

    // hide the last question when answer of first question is "no"
    return Promise.resolve([
      {
        question_id: 'x5bgJqsOltmK3',
        satisfied: false,
        rule_id: 'some_rule_id',
      },
    ])
  }

  it('Should not navigate back to a question hidden because of display conditions', async () => {
    renderWizardFormComponent(
      formHavingOneQuestionHiddenWithDisplayCondition,
      evaluateDisplayConditionsForCarInput
    )

    // Answer mandatory question
    const radioOption = await screen.findByLabelText('Yes')
    expect(radioOption).not.toBeChecked()

    await act(async () => {
      fireEvent.click(radioOption)
    })

    // GO to next question
    await clickSubmitButton()

    // Answer mandatory question
    const carTypeOption = await screen.findByLabelText('Sedan')
    expect(carTypeOption).not.toBeChecked()

    await act(async () => {
      fireEvent.click(carTypeOption)
    })

    await clickPrevButton()

    const doYouHaveCarOption = await screen.findByLabelText('No')
    expect(doYouHaveCarOption).not.toBeChecked()

    await act(async () => {
      fireEvent.click(doYouHaveCarOption)
    })

    // this should not crash
    await clickNextButton()
  })
})

// TODO Should submit the form with proper payload
// TODO Should not submit the form if the last question is required and empty
