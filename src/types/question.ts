import { Question } from './generated/types-orchestration'
export type {
  Question,
  AnswerInput,
  Option,
} from './generated/types-orchestration'
export {
  QuestionType,
  DataPointValueType,
  UserQuestionType,
} from './generated/types-orchestration'

type SliderConfig = {
  display_marks: boolean
  is_value_tooltip_on: boolean
  max: number
  max_label: string
  min: number
  min_label: string
  show_min_max_values: boolean
  step_value: number
}

export type SliderQuestionConfig = {
  mandatory: boolean
  recode_enabled?: boolean
  slider: SliderConfig
}

export type QuestionConfig = {
  mandatory: boolean
  recode_enabled?: boolean
  slider?: null
}

export type QuestionWithVisibility = Question & {
  visible: boolean
}

export type OptionValue = string | number | boolean
