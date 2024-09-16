import { UseFormReturn } from 'react-hook-form'
import {
  AnswerInput,
  Question,
  FormError,
  QuestionWithVisibility,
} from '../../types'

export type { FormError, QuestionWithVisibility } from '../../types'
export { QuestionType, UserQuestionType } from '../../types'

export enum DataPointValueType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  NumbersArray = 'NUMBERS_ARRAY',
  StringsArray = 'STRINGS_ARRAY',
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
  invalidPhoneNumber: string
  formHasErrors: string

  dateCannotBeInTheFuture?: string
  dateCannotBeInThePast?: string
  dateCannotBeToday?: string

  notANumber?: string
  numberOutOfRange?: string

  emailInvalidFormat?: string
}

export type AnswerValue = string | number | number[] | undefined

export interface FormSettingsContextProps {
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
  onSubmit: (response: Array<AnswerInput>) => Promise<void> | void
  questions: Array<Question>
  errorLabels: ErrorLabels
  storedAnswers?: string
  autosaveAnswers?: boolean
  onAnswersChange?: (answers: string) => void
}
export interface ConversationalFormContext {
  updateQuestionVisibility: () => void
  submitForm: () => void
  isSubmittingForm: boolean
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

export interface TraditionalFormContext {
  updateQuestionVisibility: () => void
  submitForm: () => void
  isSubmittingForm: boolean
  formMethods: UseFormReturn
  errors: Array<FormError>
  questionWithVisiblity: Array<QuestionWithVisibility>
  formHasErrors: boolean
}
