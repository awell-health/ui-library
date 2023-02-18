import { UseFormReturn } from 'react-hook-form'
import { AnswerInput, Question, FormError, Answer } from '../../types'

export type { FormError, QuestionWithVisibility } from '../../types'
export { QuestionType, UserQuestionType } from '../../types'

export enum DataPointValueType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  NumbersArray = 'NUMBERS_ARRAY',
  String = 'STRING',
}

export type QuestionRuleResult = {
  question_id: string
  rule_id: string
  satisfied: boolean
}

export type ErrorLabels = {
  required: string
  sliderNotTouched: string
}

export type AnswerValue = string | number | number[]

export interface FormSettingsContextProps {
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
  onSubmit: (response: Array<AnswerInput>) => Promise<void> | void
  questions: Array<Question>
  errorLabels: ErrorLabels
  storedAnswers: string
  onAnswersChange: (answers: Record<string, any>) => void
}
export interface FormSettingsContextInterface {
  updateQuestionVisibility: () => void
  submitForm: () => void
  handleGoToNextQuestion: () => void
  handleGoToPrevQuestion: () => void
  formMethods: UseFormReturn
  currentQuestion: Question
  percentageCompleted: number
  errors: Array<FormError>
  isFirstQuestion: boolean
  isLastQuestion: boolean
  isEvaluatingQuestionVisibility: boolean
}
