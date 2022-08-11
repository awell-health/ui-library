import {
  Option,
  Question,
  UserQuestionType,
  QuestionWithVisibility,
  SliderQuestionConfig,
} from '../../types'
import { AnswerValue, QuestionRuleResult } from './types'

export const getDefaultValue = (question: Question): AnswerValue => {
  switch (question.userQuestionType) {
    case UserQuestionType.MultipleSelect:
      return []
    case UserQuestionType.Slider:
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

// FIXME
const getValue = (answer: Array<Option> | string | number | Option) => {
  if (typeof answer === 'string') {
    return answer
  }
  if (typeof answer === 'number') {
    return `${answer}`
  }

  if (Array.isArray(answer)) {
    return JSON.stringify(answer.map(({ value }) => value))
  }

  if (typeof answer.value === 'boolean') {
    return answer.value ? '1' : '0'
  }

  return JSON.stringify(answer?.value)
}
export const convertToAwellInput = (formResponse: any) => {
  return Object.keys(formResponse).map((question_id) => ({
    question_id,
    value: getValue(formResponse[question_id]),
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
