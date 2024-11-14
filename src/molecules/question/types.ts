import { FormError, Question } from '../../types'
import { Control, UseFormGetValues } from 'react-hook-form'

export interface QuestionLabels {
  yes_label: string
  no_label: string
  select?: {
    search_placeholder: string
    no_options: string
    loading?: string
    icd_10_catalogue_description?: string
    icd_10_catalogue_link?: string
  }
  slider: {
    tooltip_guide: string
  }
}

export interface QuestionDataProps {
  question: Question
  control: Control
  getValues: UseFormGetValues<any>
  labels: QuestionLabels
  inputAutoFocus?: boolean
  submitAndMoveToNextQuestion?: () => void
  onAnswerChange?: () => void
  shouldAutoProgress?: (question: Question) => boolean
}
export interface QuestionProps {
  question: Question
  control: Control
  getValues: UseFormGetValues<any>
  errors: Array<FormError>
  labels?: QuestionLabels
  inputAutoFocus?: boolean
  submitAndMoveToNextQuestion?: () => void
  onAnswerChange?: () => void
  shouldAutoProgress?: (question: Question) => boolean
}
