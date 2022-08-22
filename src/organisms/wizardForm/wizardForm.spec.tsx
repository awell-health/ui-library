import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { WizardForm as WizardFormComponent } from './WizardForm'
import { form as formData } from '../../constants/formFixture'

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

describe('Wizard form', () => {
  it('Should render initial form page with title and start button and evaluate display condition on init', async () => {
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

    const title = await screen.findByText(formData.title)

    // Should evaluate display conditions once
    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(1)
    )
    // Form title should be present
    expect(title).toBeInTheDocument()
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

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() =>
      expect(evaluateDisplayConditions).toHaveBeenCalledTimes(2)
    )
    const nextButton = await screen.findByText(props.buttonLabels.next)

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
    fireEvent.click(screen.getByRole('button'))

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

    expect(await screen.findByText('description')).toBeInTheDocument()
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

      // GO TO 1st question
      fireEvent.click(screen.getByRole('button'))
      // GO TO 2nd question (mandatory)
      fireEvent.click(await screen.findByText(props.buttonLabels.next))

      const questionTitle = await screen.findByText(formData.questions[1].title)
      expect(questionTitle).toBeInTheDocument()

      // Try to go to next question
      fireEvent.click(await screen.findByText(props.buttonLabels.next))

      //  check if error is present and page was not changes
      const questionTitleAfterClick = await screen.findByText(
        formData.questions[1].title
      )
      const errorMessage = await screen.findByText(props.errorLabels.required)
      expect(questionTitleAfterClick).toBeInTheDocument()
      expect(errorMessage).toBeInTheDocument()
    }
  )
})

// TODO Should submit the form with proper payload
// TODO Should not submit the form if the last question is required and empty
