import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'

import { TraditionalForm as TraditionalFormComponent } from './TraditionalForm'
import { AnswerInput, Form } from '../../../types'
import { QuestionRuleResult } from '../../../hooks/useForm/types'
import {
  BooleanOperator,
  DataPointValueType,
  QuestionType,
  UserQuestionType,
} from '../../../types/generated/types-orchestration'

const buttonLabels = {
  prev: 'Prev',
  next: 'Next',
  submit: 'Submit',
}

const errorLabels = {
  required: 'Answer for this question is required',
  sliderNotTouched: 'You did not move the slider',
  invalidPhoneNumber: 'Please enter a valid phone number',
  formHasErrors: 'Please fix the errors in the form',
}

const cascadingLogicForm: Form = {
  id: 'traditional-cascading-logic-form',
  title: 'Traditional cascading logic form',
  key: 'traditionalCascadingLogicForm',
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

const renderTraditionalFormComponent = (
  form: Form,
  evaluateDisplayConditions: (
    response: AnswerInput[]
  ) => Promise<QuestionRuleResult[]>,
  onAnswersChange?: (answers: string) => void
) => {
  act(() => {
    render(
      <TraditionalFormComponent
        form={form}
        buttonLabels={buttonLabels}
        errorLabels={errorLabels}
        onSubmit={() => null}
        onAnswersChange={onAnswersChange}
        evaluateDisplayConditions={evaluateDisplayConditions}
      />
    )
  })
}

describe('Traditional form', () => {
  it('re-evaluates transitive display logic when an upstream answer changes', async () => {
    const evaluateDisplayConditions = jest.fn(
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
    const onAnswersChange = jest.fn()

    renderTraditionalFormComponent(
      cascadingLogicForm,
      evaluateDisplayConditions,
      onAnswersChange
    )

    await waitFor(() => expect(screen.getByText('Q1')).toBeInTheDocument())

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Q1 A'))
    })

    await waitFor(() => expect(screen.getByText('Q2')).toBeInTheDocument())

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Q2 X'))
    })

    await waitFor(() => expect(screen.getByText('Q3')).toBeInTheDocument())

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Q3 Y'))
    })

    await act(async () => {
      fireEvent.click(screen.getByLabelText('Q1 B'))
    })

    await waitFor(() => {
      expect(screen.queryByText('Q2')).not.toBeInTheDocument()
      expect(screen.queryByText('Q3')).not.toBeInTheDocument()
    })

    await waitFor(() => {
      const lastAutosavedAnswers = JSON.parse(
        onAnswersChange.mock.calls[onAnswersChange.mock.calls.length - 1][0]
      )

      expect(lastAutosavedAnswers.q1).toEqual({
        id: 'q1-b',
        label: 'Q1 B',
        value: 2,
        value_string: '2',
      })
      expect(lastAutosavedAnswers.q2).toBe('')
      expect(lastAutosavedAnswers.q3).toBe('')
    })
  })
})
