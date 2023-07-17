import { ErrorLabels, QuestionRuleResult } from '../../../hooks/useForm/types'
import { QuestionLabels } from '../../../molecules/question/types'
import { AnswerInput, Form } from '../../../types'

type ButtonLabels = {
  prev: string
  next: string
  submit: string
  start_form?: string
}

export interface WizardFormProps {
  form: Form
  questionLabels?: QuestionLabels
  storedAnswers: string
  onAnswersChange: (answers: string) => void
  buttonLabels: ButtonLabels
  errorLabels: ErrorLabels
  onSubmit: (response: Array<AnswerInput>) => void
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
}
