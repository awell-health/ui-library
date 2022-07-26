import {
  Question,
  QuestionType,
  QuestionWithVisibility,
  SliderQuestionConfig,
} from '../../types'
import { AnswerValue, QuestionRuleResult } from './types'

const ensureString = (val: AnswerValue) =>
  typeof val === 'string' ? val : JSON.stringify(val)

export const getDefaultValue = (question: Question): AnswerValue => {
  switch (question.userQuestionType) {
    case QuestionType.MultipleSelect:
      return []
    case QuestionType.Slider:
      return (question.questionConfig as SliderQuestionConfig)?.slider?.min ?? 0
    default:
      return ''
  }
}
export const getInitialValues = (
  questions: Array<Question>
): Record<string, AnswerValue> =>
  questions.reduce((obj: any, item: Question) => {
    return {
      ...obj,
      [item.id]: getDefaultValue(item),
    }
  }, {})
export const convertToAwellInput = (formResponse: any) => {
  return Object.keys(formResponse).map((question_id) => ({
    question_id,
    value: ensureString(formResponse[question_id]),
  }))
}
/**
 * Updates question visibility after rules evaluations
 */
export const updateVisibility = (
  questions: Array<Question>,
  evaluation_results: Array<QuestionRuleResult>
): Array<QuestionWithVisibility> =>
  questions.map((question) => {
    const result = evaluation_results.find(
      ({ question_id }) => question_id === question.id
    )

    const visible = !result ? true : result?.satisfied
    return { ...question, visible }
  })

export const isEmpty = (value: any) => {
  return (
    (typeof Array.isArray(value) && value.length === 0) ||
    (typeof value === 'string' && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  )
}
