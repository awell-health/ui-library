import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { WizardForm as WizardFormComponent } from './WizardForm'
import {
  form as formData,
  sliderQuestionForm
} from './__testdata__/testFormFixture'
import { act } from 'react-dom/test-utils'

const props = {
  buttonLabels: {
    prev: 'Prev',
    next: 'Next',
    submit: 'Submit',
  },
  errorLabels: {
    required: 'Answer for this question is required',
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
const thirdQuestion = formData.questions[2]

describe('Wizard form', () => {
  it('Should render the first question and evaluate display condition on init', async () => {
    const evaluateDisplayConditions = jest.fn().mockResolvedValue([])
    render(
      <WizardFormComponent
        form={formData}
        buttonLabels={props.buttonLabels}
        errorLabels={props.errorLabels}
        onSubmit={() => null}
        evaluateDisplayConditions={evaluateDisplayConditions}
      />
    )

    const firstQuestionLabel = await screen.findByText(firstQuestion.title)

    // Should evaluate display conditions once
    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(1)
    )
    // Form title should be present
    expect(firstQuestionLabel).toBeInTheDocument()
  })

  it('Should properly navigate to next question', async () => {
    const evaluateDisplayConditions = jest.fn().mockResolvedValue([])
    render(
      <WizardFormComponent
        form={formData}
        buttonLabels={props.buttonLabels}
        errorLabels={props.errorLabels}
        onSubmit={() => null}
        evaluateDisplayConditions={evaluateDisplayConditions}
      />
    )

    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(1)
    )

    fireEvent.click(await screen.findByText(props.buttonLabels.next))

    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(2)
    )

    const secondQuestionLabel = await screen.findByText(secondQuestion.title)

    const nextButton = await screen.findByText(props.buttonLabels.next)

    expect(secondQuestionLabel).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('Should properly navigate to previous question', async () => {
    const evaluateDisplayConditions = jest.fn().mockResolvedValue([])

    render(
      <WizardFormComponent
        form={formData}
        buttonLabels={props.buttonLabels}
        errorLabels={props.errorLabels}
        onSubmit={() => null}
        evaluateDisplayConditions={evaluateDisplayConditions}
      />
    )

    // GO to 1st question
    fireEvent.click(await screen.findByText(props.buttonLabels.next))
    // GO to 2nd question
    fireEvent.click(await screen.findByText(props.buttonLabels.next))

    // Answer mandatory question
    const radioOption = await screen.findByLabelText('Option 1')
    expect(radioOption).not.toBeChecked()

    fireEvent.click(radioOption)

    expect(radioOption).toBeChecked()

    // GO back to 1st question
    fireEvent.click(await screen.findByText(props.buttonLabels.prev))

    // Check if evaluate visibility conditions were called each time user
    // navigates to NEXT question + 1 on init
    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(3)
    )

    expect(await screen.findByText(firstQuestion.title)).toBeInTheDocument()
  })

  it(
    'Should not navigate to next question when required question was not filled.' +
      ' Should show proper error to the user',
    async () => {
      const evaluateDisplayConditions = jest.fn().mockResolvedValue([])
      render(
        <WizardFormComponent
          form={formData}
          buttonLabels={props.buttonLabels}
          errorLabels={props.errorLabels}
          onSubmit={() => null}
          evaluateDisplayConditions={evaluateDisplayConditions}
        />
      )

      // GO TO 2nd question
      fireEvent.click(await screen.findByText(props.buttonLabels.next))

      const secondQuestionTitle = await screen.findByText(secondQuestion.title)
      expect(secondQuestionTitle).toBeInTheDocument()

      // Try to go to next (3rd) question
      fireEvent.click(await screen.findByText(props.buttonLabels.next))

      //  check if error is present and page was not changed
      const questionTitleAfterClick = await screen.findByText(
        secondQuestion.title
      )
      const errorMessage = await screen.findByText(props.errorLabels.required)

      expect(questionTitleAfterClick).toBeInTheDocument()
      expect(errorMessage).toBeInTheDocument()
    }
  )

  it('Should show error message when user tries to skip required slider question', async () => {
    const evaluateDisplayConditions = jest.fn().mockResolvedValue([])
    render(
      <WizardFormComponent
        form={sliderQuestionForm}
        buttonLabels={props.buttonLabels}
        errorLabels={props.errorLabels}
        onSubmit={() => null}
        evaluateDisplayConditions={evaluateDisplayConditions}
      />
    )

    // Try to go to next question
    fireEvent.click(await screen.findByText(props.buttonLabels.next))

    //  check if error is present and page was not changes
    const questionTitleAfterClick = await screen.findByText(
      sliderQuestionForm.questions[0].title
    )
    const errorMessage = await screen.findByText(props.errorLabels.required)

    expect(questionTitleAfterClick).toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
  })
})

// TODO Should submit the form with proper payload
// TODO Should not submit the form if the last question is required and empty
