import { FormError, Question } from '../../types'
import { Control, UseFormGetValues } from 'react-hook-form'

export interface QuestionDataProps {
  question: Question
  control: Control
  getValues: UseFormGetValues<any>
}
export interface QuestionProps {
  question: Question
  control: Control
  getValues: UseFormGetValues<any>
  errors: Array<FormError>
}
