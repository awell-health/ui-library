import { ErrorLabels, QuestionRuleResult } from '../hooks/useWizardForm/types'
import { AnswerInput, Form } from '.'

export type { Form } from '../types/generated/types-orchestration'

export type FormError = { id: string; error: string }

type ButtonLabels = {
  prev: string
  next: string
  submit: string
  start_form?: string
}

export interface WizardFormProps {
  form: Form
  buttonLabels: ButtonLabels
  errorLabels: ErrorLabels
  onSubmit: (response: Array<AnswerInput>) => void
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
}
