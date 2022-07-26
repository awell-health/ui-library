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
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
  onSubmit: (response: Array<AnswerInput>) => void
  buttonLabels: ButtonLabels
  errorLabels: ErrorLabels
}
