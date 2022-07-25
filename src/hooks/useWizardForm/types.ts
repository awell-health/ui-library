import { UseFormReturn } from 'react-hook-form/dist/types'

export enum DataPointValueType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  NumbersArray = 'NUMBERS_ARRAY',
  String = 'STRING',
}
export type AnswerInput = {
  question_id: string
  value: string
}
export type Answer = {
  __typename?: 'Answer'
  question_id: string
  value: string
  value_type: DataPointValueType
}
export type QuestionRuleResult = {
  __typename?: 'QuestionRuleResult'
  question_id: string
  rule_id: string
  satisfied: boolean
}

export interface FormSettingsContextProps {
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
  onSubmit: (response: Array<AnswerInput>) => Promise<void> | void
  questions: Array<any>
}
export interface FormSettingsContextInterface {
  updateQuestionVisibility: () => void
  submitForm: () => void
  handleGoToNextQuestion: () => void
  handleGoToPrevQuestion: () => void
  handleFormChange: () => void
  formMethods: UseFormReturn
  currentQuestion: any
  currentError: string
  isFirstQuestion: boolean
  isLastQuestion: boolean
  isEntryPage: boolean
}
