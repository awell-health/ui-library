import {
  ErrorLabels,
  QuestionRuleResult,
  UserQuestionType,
} from '../hooks/useWizardForm/types'
import { AnswerInput, Form } from '.'
import { QuestionLabels } from '../molecules/question/types'
import { CountryIso2 } from 'react-international-phone'

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
  questionLabels?: QuestionLabels
  buttonLabels: ButtonLabels
  errorLabels: ErrorLabels
  onSubmit: (response: Array<AnswerInput>) => void
  storedAnswers?: string
  questionTypeConfig?: QuestionConfigByType
  onAnswersChange?: (answers: string) => void
  evaluateDisplayConditions: (
    response: Array<AnswerInput>
  ) => Promise<Array<QuestionRuleResult>>
}

export interface QuestionConfigByType {
  [UserQuestionType.Telephone]?: {
    availableCountries?: Array<CountryIso2> | CountryIso2
    initialCountry?: CountryIso2
    fixedCountry?: CountryIso2
    placeholder?: string
  }
}
