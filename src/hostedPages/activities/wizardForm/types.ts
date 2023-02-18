import {
  ErrorLabels,
  QuestionRuleResult,
} from '../../../hooks/useWizardForm/types'
import { AnswerInput, Form } from '../../../types'

type ButtonLabels = {
  prev: string
  next: string
  submit: string
  start_form?: string
}

export interface WizardFormProps {
  form: Form
  storedAnswers: string
  onAnswersChange: (answers: Record<string, any>) => void
  buttonLabels: ButtonLabels
  errorLabels: ErrorLabels
  onSubmit: (response: Array<AnswerInput>) => void
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
}
