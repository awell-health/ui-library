import { UseFormReturn } from 'react-hook-form'
import {
  BooleanOperator,
  DataPointValueType,
  Question,
  QuestionType,
  UserQuestionType,
} from '../../types/generated/types-orchestration'
import {
  evaluateQuestionVisibility,
  getDependentQuestionIds,
  updateVisibility,
} from './helpers'
import { AnswerValue } from './types'

const createQuestion = ({
  id,
  key = `${id}-key`,
  definition_id = `${id}-definition`,
  references = [],
}: {
  id: string
  key?: string
  definition_id?: string
  references?: Array<string>
}): Question => ({
  id,
  key,
  definition_id,
  title: id,
  dataPointValueType: DataPointValueType.String,
  options: [],
  questionConfig: {
    mandatory: false,
  },
  questionType: QuestionType.MultipleChoice,
  userQuestionType: UserQuestionType.MultipleChoice,
  rule:
    references.length > 0
      ? {
          id: `${id}-rule`,
          boolean_operator: BooleanOperator.And,
          conditions: references.map((reference) => ({
            id: `${id}-${reference}-condition`,
            reference,
          })),
        }
      : undefined,
})

const createFormMethods = (
  values: Record<string, AnswerValue>
): UseFormReturn => {
  const dirtyFields = new Set(Object.keys(values))

  return {
    getValues: jest.fn((field?: string) => {
      if (field) {
        return values[field]
      }

      return values
    }),
    getFieldState: jest.fn((field: string) => ({
      isDirty: dirtyFields.has(field),
      isTouched: dirtyFields.has(field),
      invalid: false,
      isValidating: false,
      error: undefined,
    })),
    resetField: jest.fn(
      (field: string, options?: { defaultValue?: AnswerValue }) => {
        values[field] = options?.defaultValue
        dirtyFields.delete(field)
      }
    ),
  } as unknown as UseFormReturn
}

describe('useForm helpers', () => {
  describe('getDependentQuestionIds', () => {
    it('returns direct and transitive dependents for id references', () => {
      const questions = [
        createQuestion({ id: 'q1' }),
        createQuestion({ id: 'q2', references: ['q1'] }),
        createQuestion({ id: 'q3', references: ['q2'] }),
      ]

      expect(getDependentQuestionIds(questions, 'q1')).toEqual(['q2', 'q3'])
    })

    it('matches condition references against question key and definition id', () => {
      const questions = [
        createQuestion({
          id: 'q1',
          key: 'question-key',
          definition_id: 'question-definition',
        }),
        createQuestion({ id: 'q2', references: ['question-key'] }),
        createQuestion({ id: 'q3', references: ['question-definition'] }),
      ]

      expect(getDependentQuestionIds(questions, 'q1')).toEqual(['q2', 'q3'])
    })

    it('returns an empty list when no questions depend on the changed question', () => {
      const questions = [
        createQuestion({ id: 'q1' }),
        createQuestion({ id: 'q2' }),
      ]

      expect(getDependentQuestionIds(questions, 'q1')).toEqual([])
    })

    it('does not include the changed question when display logic has a cycle', () => {
      const questions = [
        createQuestion({ id: 'q1', references: ['q2'] }),
        createQuestion({ id: 'q2', references: ['q1'] }),
      ]

      expect(getDependentQuestionIds(questions, 'q1')).toEqual(['q2'])
    })
  })

  describe('evaluateQuestionVisibility', () => {
    it('resets dependent and hidden answers before returning visible questions', async () => {
      const questions = [
        createQuestion({ id: 'q1' }),
        createQuestion({ id: 'q2', references: ['q1'] }),
        createQuestion({ id: 'q3', references: ['q2'] }),
      ]
      const values = {
        q1: '2',
        q2: '1',
        q3: '1',
      }
      const formMethods = createFormMethods(values)
      const evaluateDisplayConditions = jest.fn(async (answers) => {
        const q2Answer = answers.find(({ question_id }) => question_id === 'q2')

        return [
          {
            question_id: 'q2',
            rule_id: 'q2-rule',
            satisfied: true,
          },
          {
            question_id: 'q3',
            rule_id: 'q3-rule',
            satisfied: q2Answer?.value === '1',
          },
        ]
      })

      const visibleQuestions = await evaluateQuestionVisibility({
        questions,
        formMethods,
        evaluateDisplayConditions,
        updateVisibilityForQuestions: updateVisibility,
        changedQuestionId: 'q1',
      })

      expect(formMethods.resetField).toHaveBeenCalledWith('q2', {
        defaultValue: '',
      })
      expect(formMethods.resetField).toHaveBeenCalledWith('q3', {
        defaultValue: '',
      })
      expect(visibleQuestions.map(({ id }) => id)).toEqual(['q1', 'q2'])
      expect(values).toEqual({
        q1: '2',
        q2: '',
        q3: '',
      })
    })
  })
})
