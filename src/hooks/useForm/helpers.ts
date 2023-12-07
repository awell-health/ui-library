import { UseFormReturn } from 'react-hook-form'
import {
  Option,
  Question,
  UserQuestionType,
  QuestionWithVisibility,
  SliderQuestionConfig,
  FormError,
} from '../../types'
import { AnswerValue, ErrorLabels, QuestionRuleResult } from './types'
import { CountryIso2 } from 'react-international-phone'

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
 * Converts the answer string to the format that the form expects
 * @returns the answers in the format that react hook form expects
 */
export const convertToFormFormat = (
  answersAsString: string | undefined,
  questions: Array<Question>
): Record<string, AnswerValue> => {
  if (
    questions == null ||
    answersAsString === undefined ||
    isEmpty(answersAsString)
  ) {
    return {}
  }
  try {
    return JSON.parse(answersAsString)
  } catch (e) {
    console.warn('Could not parse answers', e)
    return {}
  }
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

/**
 * Calculating the progress in a form is not as easy as it seems.
 *
 * Why?
 * ------
 * Due to display logic. A form can have 20 questions in total, but when starting the form there's only
 * 1 visibile question. This mean you cannot calculate the percentage by dividing the current
 * question position by the number of visible questions as it might be that additional questions will load
 * when display logic is evaluated.
 *
 * Progress is therefore better determined by looking at the index of the current question in relation
 * to the total number of questions.
 *
 * Example:
 * ----------
 * currentQuestionId = "question_2"
 * allQuestions [{question_id: "question_1"}, {question_id: "question_2"}, {question_id: "question_3"}]
 *
 * currentQuestionIndex = 1 (we add 1 to this because we want to include the current question to count towards the percentage completed)
 * total number of questions = 3
 *
 * Expected outcome: 66%
 */
interface CalculatePercentageCompletedProps {
  currentQuestionId: string
  allQuestions: Question[]
}

export const calculatePercentageCompleted = ({
  currentQuestionId,
  allQuestions,
}: CalculatePercentageCompletedProps): number => {
  const currentQuestionIndex = allQuestions.findIndex(
    (q) => q.id === currentQuestionId
  )

  /**
   * Return 0 if question cannot be found.
   * Should theoretically never happen.
   */
  if (currentQuestionIndex === -1) {
    return 0
  }

  return Math.round(((currentQuestionIndex + 1) / allQuestions.length) * 100)
}

export const getErrorsForQuestion = (
  currentQuestion: QuestionWithVisibility,
  formMethods: UseFormReturn<Record<string, AnswerValue>, any>,
  errorLabels: ErrorLabels,
  isValidE164Number: (
    number: string,
    availableCountries?: CountryIso2 | Array<CountryIso2> | undefined
  ) => boolean
): Array<FormError> => {
  // For description question types, don't validate
  if (currentQuestion?.userQuestionType === UserQuestionType.Description) {
    return []
  }

  const isQuestionMandatory = currentQuestion?.questionConfig?.mandatory
  const valueOfCurrentQuestion = formMethods.getValues(currentQuestion?.id)

  // For all question types, validate mandatory answers
  if (isQuestionMandatory && isEmpty(valueOfCurrentQuestion)) {
    return [{ id: currentQuestion.id, error: errorLabels.required }]
  }

  // For telephone question types, validate phone number
  if (currentQuestion?.userQuestionType === UserQuestionType.Telephone) {
    if (valueOfCurrentQuestion !== '') {
      const errorLabel = errorLabels.invalidPhoneNumber
      try {
        const isValid = isValidE164Number(valueOfCurrentQuestion as string)
        if (!isValid) {
          return [{ id: currentQuestion.id, error: errorLabel }]
        }
      } catch (error) {
        return [{ id: currentQuestion.id, error: errorLabel }]
      }
    }
  }

  return []
}
