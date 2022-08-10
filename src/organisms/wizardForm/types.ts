import {
  ErrorLabels,
  QuestionRuleResult,
} from '../../hooks/useWizardForm/types'
import { AnswerInput, Form } from '../../types'

type ButtonLabels = {
  prev: string
  next: string
  submit: string
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
