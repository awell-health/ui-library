import { UseFormReturn } from 'react-hook-form'
import { AnswerInput, Question, FormError } from '../../types'

export type { FormError, QuestionWithVisibility } from '../../types'
export { QuestionType } from '../../types'

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
}

export type AnswerValue = string | number | number[]

export interface FormSettingsContextProps {
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
  onSubmit: (response: Array<AnswerInput>) => Promise<void> | void
  questions: Array<Question>
  errorLabels: ErrorLabels
}
export interface FormSettingsContextInterface {
  updateQuestionVisibility: () => void
  submitForm: () => void
  handleGoToNextQuestion: () => void
  handleGoToPrevQuestion: () => void
  formMethods: UseFormReturn
  currentQuestion: Question
  errors: Array<FormError>
  isFirstQuestion: boolean
  isLastQuestion: boolean
  isEntryPage: boolean
}
