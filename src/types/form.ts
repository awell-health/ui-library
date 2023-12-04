import { ErrorLabels, QuestionRuleResult } from '../hooks/useForm/types'
import { AnswerInput, Form } from '.'
import { QuestionLabels } from '../molecules/question/types'

export type { Form } from '../types/generated/types-orchestration'

export type FormError = { id: string; error: string }

type ButtonLabels = {
  prev: string
  next: string
  submit: string
  start_form?: string
}

export interface FormProps {
  form: Form
  questionLabels?: QuestionLabels
  buttonLabels: ButtonLabels
  errorLabels: ErrorLabels
  onSubmit: (response: Array<AnswerInput>) => void
  storedAnswers?: string
  onAnswersChange?: (answers: string) => void
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
  autoProgress?: boolean
  autosaveAnswers?: boolean
}
