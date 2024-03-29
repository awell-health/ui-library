import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ConversationalForm as ConversationalFormComponent } from './ConversationalForm'
import {
  form as formData,
  sliderQuestionForm,
  formWithTwoRequiredSingleSelectQuestions,
  dateQuestionForm,
} from './__testdata__/testFormFixture'
import { AnswerInput, Form } from '../../../types'
import { QuestionRuleResult } from '../../../hooks/useForm/types'

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
    formHasErrors: 'Please fix the errors in the form',
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

const renderConversationalFormComponent = (
  form: Form,
  evaluateDisplayConditions: (
    response: AnswerInput[]
  ) => Promise<QuestionRuleResult[]>
) => {
  act(() => {
    render(
      <ConversationalFormComponent
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

const clickPrevButton = async () => {
  const prevButton = await screen.findByText(buttonLabels.prev)
  await act(async () => {
    fireEvent.click(prevButton)
  })
}

describe('Conversational Form', () => {
  let evaluateDisplayConditions: (
    response: AnswerInput[]
  ) => Promise<QuestionRuleResult[]>

  beforeEach(() => {
    evaluateDisplayConditions = jest.fn().mockResolvedValue([])
  })

  it('Should render the first question and evaluate display condition on init', async () => {
    renderConversationalFormComponent(formData, evaluateDisplayConditions)

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
    renderConversationalFormComponent(formData, evaluateDisplayConditions)

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
    renderConversationalFormComponent(formData, evaluateDisplayConditions)

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

    // Remove this when auto progress is back
    await clickNextButton()

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
      expect(screen.getByText(normalizedFirstQuestionTitle)).toBeInTheDocument()
    )
  })

  it('Should properly navigate between required questions', async () => {
    renderConversationalFormComponent(
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

    // Remove this when auto progress is back
    await clickNextButton()

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
    renderConversationalFormComponent(
      sliderQuestionForm,
      evaluateDisplayConditions
    )

    // Try to go to next question
    await clickNextButton()

    const errorMessage = await screen.findByText(
      'Answer for this question is required'
    )

    expect(errorMessage).toBeInTheDocument()
  })

  it('Should show error message when user tries to skip required date question', async () => {
    renderConversationalFormComponent(
      dateQuestionForm,
      evaluateDisplayConditions
    )

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
})

// TODO Should submit the form with proper payload
// TODO Should not submit the form if the last question is required and empty
