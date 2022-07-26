export enum QuestionType {
  Date = 'DATE',
  Description = 'DESCRIPTION',
  LongText = 'LONG_TEXT',
  MultipleChoice = 'MULTIPLE_CHOICE',
  MultipleChoiceGrid = 'MULTIPLE_CHOICE_GRID',
  MultipleSelect = 'MULTIPLE_SELECT',
  Number = 'NUMBER',
  ShortText = 'SHORT_TEXT',
  Signature = 'SIGNATURE',
  Slider = 'SLIDER',
  YesNo = 'YES_NO',
}

type QuestionTypeUnion = `${QuestionType}`

enum Type {
  Input = 'INPUT',
  MultipleChoice = 'MULTIPLE_CHOICE',
  NoInput = 'NO_INPUT',
}

type TypeUnion = `${Type}`

export enum DataPointValueType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  NumbersArray = 'NUMBERS_ARRAY',
  String = 'STRING',
}

type DataPointValueTypeUnion = `${DataPointValueType}` | null

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

export type Option = {
  id: string
  label: string
  value: number
}

export interface SliderQuestion {
  id: string
  title: string
  form_id: string
  key: string
  dataPointValueType?: DataPointValueTypeUnion
  rule_id?: string | null
  options: Array<Option>
  questionConfig: SliderQuestionConfig
  userQuestionType: 'SLIDER'
  questionType?: TypeUnion
}

interface CommonQuestion {
  id: string
  title: string
  form_id: string
  key: string
  dataPointValueType?: DataPointValueTypeUnion
  rule_id?: string | null
  options: Array<Option>
  questionConfig?: QuestionConfig
  userQuestionType?: Omit<QuestionTypeUnion, 'SLIDER'>
  questionType?: TypeUnion
}

export type Question = CommonQuestion | SliderQuestion

export type QuestionWithVisibility = Question & {
  visible: boolean
}

export type AnswerInput = {
  question_id: string
  value: string
}

export type OptionValue = string | number | boolean

export type AnswerOption = {
  id: string
  label: string
  value: OptionValue
}
