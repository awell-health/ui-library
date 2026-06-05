import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ConversationalForm as ConversationalFormComponent } from './ConversationalForm'
import {
  BooleanOperator,
  DataPointValueType,
  QuestionType,
  UserQuestionType,
} from '../../../types/generated/types-orchestration'
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

const cascadingLogicForm: Form = {
  id: 'conversational-cascading-logic-form',
  title: 'Conversational cascading logic form',
  key: 'conversationalCascadingLogicForm',
  definition_id: '',
  release_id: '',
  questions: [
    {
      id: 'q1',
      title: 'Q1',
      definition_id: '',
      key: 'q1',
      dataPointValueType: DataPointValueType.String,
      options: [
        {
          id: 'q1-a',
          label: 'Q1 A',
          value: 1,
          value_string: '1',
        },
        {
          id: 'q1-b',
          label: 'Q1 B',
          value: 2,
          value_string: '2',
        },
      ],
      questionType: QuestionType.MultipleChoice,
      userQuestionType: UserQuestionType.MultipleChoice,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'q2',
      title: 'Q2',
      definition_id: '',
      key: 'q2',
      dataPointValueType: DataPointValueType.String,
      options: [
        {
          id: 'q2-x',
          label: 'Q2 X',
          value: 1,
          value_string: '1',
        },
      ],
      questionType: QuestionType.MultipleChoice,
      userQuestionType: UserQuestionType.MultipleChoice,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
      rule: {
        id: 'q2-rule',
        boolean_operator: BooleanOperator.And,
        conditions: [],
      },
    },
    {
      id: 'q3',
      title: 'Q3',
      definition_id: '',
      key: 'q3',
      dataPointValueType: DataPointValueType.String,
      options: [
        {
          id: 'q3-y',
          label: 'Q3 Y',
          value: 1,
          value_string: '1',
        },
      ],
      questionType: QuestionType.MultipleChoice,
      userQuestionType: UserQuestionType.MultipleChoice,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
      rule: {
        id: 'q3-rule',
        boolean_operator: BooleanOperator.And,
        conditions: [],
      },
    },
  ],
}

const renderConversationalFormComponent = (
  form: Form,
  evaluateDisplayConditions: (
    response: AnswerInput[]
  ) => Promise<QuestionRuleResult[]>,
  onSubmit: (response: AnswerInput[]) => Promise<void> | void = () => null
) => {
  act(() => {
    render(
      <ConversationalFormComponent
        form={form}
        buttonLabels={buttonLabels}
        errorLabels={errorLabels}
        onSubmit={onSubmit}
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

  it('Should not navigate to stale downstream questions after changing an upstream answer', async () => {
    const onSubmit = jest.fn()
    const evaluateCascadingDisplayConditions = jest.fn(
      async (response: AnswerInput[]) => {
        const q1Answer = response.find(
          ({ question_id }) => question_id === 'q1'
        )
        const q2Answer = response.find(
          ({ question_id }) => question_id === 'q2'
        )

        return [
          {
            question_id: 'q2',
            rule_id: 'q2-rule',
            satisfied: q1Answer?.value === '1',
          },
          {
            question_id: 'q3',
            rule_id: 'q3-rule',
            satisfied: q2Answer?.value === '1',
          },
        ]
      }
    )

    renderConversationalFormComponent(
      cascadingLogicForm,
      evaluateCascadingDisplayConditions,
      onSubmit
    )

    await waitFor(() => expect(screen.getByText('Q1')).toBeInTheDocument())

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Q1 A'))
    })
    await clickSubmitButton()
    await waitFor(() => expect(screen.getByText('Q2')).toBeInTheDocument())

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Q2 X'))
    })
    await clickSubmitButton()
    await waitFor(() => expect(screen.getByText('Q3')).toBeInTheDocument())

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Q3 Y'))
    })
    await clickPrevButton()
    await waitFor(() => expect(screen.getByText('Q2')).toBeInTheDocument())
    await clickPrevButton()
    await waitFor(() => expect(screen.getByText('Q1')).toBeInTheDocument())

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Q1 B'))
    })
    await clickNextButton()

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    expect(onSubmit).toHaveBeenCalledWith([
      {
        question_id: 'q1',
        value: '2',
      },
      {
        question_id: 'q2',
        value: '',
      },
      {
        question_id: 'q3',
        value: '',
      },
    ])
    expect(screen.queryByText('Q3')).not.toBeInTheDocument()
  })
})

// TODO Should submit the form with proper payload
// TODO Should not submit the form if the last question is required and empty
