import { FormError, Question } from '../../types'
import { Control } from 'react-hook-form'
import { UseFormGetValues } from 'react-hook-form/dist/types/form'

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
  onFormChange: () => void
}
