import { FormError, Question } from '../../types'
import { Control, UseFormGetValues } from 'react-hook-form'
import { QuestionConfigByType } from '../../types/form'

export interface QuestionLabels {
  yes_label: string
  no_label: string
  select?: {
    search_placeholder: string
    no_options: string
  }
}

export interface QuestionDataProps {
  question: Question
  control: Control
  getValues: UseFormGetValues<any>
  labels: QuestionLabels
  questionTypeConfig: QuestionConfigByType
  submitAndMoveToNextQuestion?: () => void
}
export interface QuestionProps {
  question: Question
  control: Control
  getValues: UseFormGetValues<any>
  errors: Array<FormError>
  labels?: QuestionLabels
  questionTypeConfig: QuestionConfigByType
  submitAndMoveToNextQuestion?: () => void
}
