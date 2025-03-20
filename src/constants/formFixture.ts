import {
  AllowedDatesOptions,
  Form,
  QuestionType,
  UserQuestionType,
} from '../types'
import { DataPointValueType } from '../types/question'

export const form: Form = {
  id: 'Kzr2NafTxJfR',
  title: 'Example form',
  key: 'exampleForm',
  definition_id: 'Kzr2NafTxJfR',
  // trademark: 'A dummy trademark by Awell',
  release_id: '',
  questions: [
    {
      id: 'asd',
      title: 'This is File Upload question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsFileUploadQuestion',
      dataPointValueType: DataPointValueType.AttachmentsArray,
      options: [],
      questionType: QuestionType.Input,
      userQuestionType: UserQuestionType.File,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
        file_storage: {
          file_storage_config_slug: 'config-slug',
          accepted_file_types: ['image/*', 'application/pdf'],
        },
      },
    },
    {
      id: '5KMcDYtoz0r1',
      title: 'This is date question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsDateQuestion',
      dataPointValueType: DataPointValueType.Date,
      options: [],
      questionType: QuestionType.Input,
      userQuestionType: UserQuestionType.Date,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
        date: {
          allowed_dates: AllowedDatesOptions.Future,
          include_date_of_response: true,
        },
      },
    },
    {
      id: 'fSN5BktQ6cOV',
      title:
        '[{"type":"p","children":[{"text":"This ","bold":true},{"text":"is","italic":true},{"text":" "},{"text":"rich text","strikethrough":true},{"text":" "},{"text":"description","underline":true}]}]',
      key: 'typePChildrenTextThisBoldTrueTextIsItalicTrueTextTextRichTextStrikethroughTrueTextTextDescriptionUnderlineTrue',
      dataPointValueType: null,
      options: [],
      definition_id: 'fSN5BktQ6cOV',
      questionType: QuestionType.NoInput,
      userQuestionType: UserQuestionType.Description,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'x5bgJqOltmK3',
      title: 'Single select question',
      key: 'singleSelectQuestion',
      definition_id: 'x5bgJqOltmK3',
      dataPointValueType: DataPointValueType.Number,
      options: [
        {
          id: '1',
          label: 'Option 1',
          value: 0,
          value_string: '0',
        },
        {
          id: '2',
          label: 'Option 2',
          value: 1,
          value_string: '1',
        },
        {
          id: '3',
          label: 'Option 3',
          value: 3,
          value_string: '3',
        },
        {
          id: '4',
          label: 'Option 4',
          value: 4,
          value_string: '4',
        },
        {
          id: '5',
          label: 'Option 5',
          value: 5,
          value_string: '5',
        },
        {
          id: '6',
          label:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
          value: 6,
          value_string: '6',
        },
        {
          id: '7',
          label: 'Option 7',
          value: 7,
          value_string: '7',
        },
      ],
      questionType: QuestionType.MultipleChoice,
      userQuestionType: UserQuestionType.MultipleChoice,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
        slider: null,
      },
    },
    {
      id: 'HyIaUkgDcXwR',
      title: 'This is multiple select question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsMultipleSelectQuestion',
      dataPointValueType: DataPointValueType.NumbersArray,
      options: [
        {
          id: 'ZT6yN64opulL',
          value: 0,
          value_string: '0',
          label: 'Option 1',
        },
        {
          id: 'RqYicEXp0agy',
          value: 1,
          value_string: '1',
          label: 'Option 2',
        },
        {
          id: 'd_uA9ldC6L8_',
          value: 2,
          value_string: '2',
          label: 'Option 3',
        },
        {
          id: 'ZkhlOC3DfSOF',
          value: 3,
          value_string: '3',
          label: 'Option 4',
        },
      ],
      questionType: QuestionType.MultipleChoice,
      userQuestionType: UserQuestionType.MultipleSelect,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'VkL1vrscT5MV',
      title: 'This is yes or no question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsYesOrNoQuestion',
      dataPointValueType: DataPointValueType.Boolean,
      options: [],
      questionType: QuestionType.Input,
      userQuestionType: UserQuestionType.YesNo,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
        slider: null,
      },
    },
    {
      id: 'XAgYxu_kbDPj',
      title: 'This is slider question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsSliderQuestion',
      dataPointValueType: DataPointValueType.Number,
      options: [],
      questionType: QuestionType.Input,
      userQuestionType: UserQuestionType.Slider,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
        slider: {
          min: 0,
          max: 10,
          step_value: 1,
          display_marks: true,
          min_label: 'Min',
          max_label: 'Max',
          is_value_tooltip_on: true,
          show_min_max_values: true,
        },
      },
    },
    {
      id: '5KMcDYtoz0rr',
      title: 'This is number question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsNumberQuestion',
      dataPointValueType: DataPointValueType.Number,
      options: [],
      questionType: QuestionType.Input,
      userQuestionType: UserQuestionType.Number,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'U99uUQ_Jp5Jb',
      title: 'This is short text question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsShortTextQuestion',
      dataPointValueType: DataPointValueType.String,
      options: [],
      questionType: QuestionType.Input,
      userQuestionType: UserQuestionType.ShortText,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: '6mv3n9HaXFTU',
      title: 'This is long text question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsLongTextQuestion',
      dataPointValueType: DataPointValueType.String,
      options: [],
      questionType: QuestionType.Input,
      userQuestionType: UserQuestionType.LongText,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'x5bgJqOltmK3_dropdown',
      title: 'Single select question (dropdown)',
      key: 'singleSelectQuestionDropdown',
      definition_id: 'x5bgJqOltmK3_dropdown',
      dataPointValueType: DataPointValueType.Number,
      options: [
        {
          id: '1',
          label: 'Option 1',
          value: 0,
          value_string: '0',
        },
        {
          id: '2',
          label: 'Option 2',
          value: 1,
          value_string: '1',
        },
        {
          id: '3',
          label: 'Option 3',
          value: 3,
          value_string: '3',
        },
        {
          id: '4',
          label: 'Option 4',
          value: 4,
          value_string: '4',
        },
        {
          id: '5',
          label: 'Option 5',
          value: 5,
          value_string: '5',
        },
        {
          id: '6',
          label:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
          value: 6,
          value_string: '6',
        },
        {
          id: '7',
          label: 'Option 7',
          value: 7,
          value_string: '7',
        },
      ],
      questionType: QuestionType.MultipleChoice,
      userQuestionType: UserQuestionType.MultipleChoice,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
        slider: null,
        use_select: true,
      },
    },
  ],
}

export const sliderQuestionForm: Form = {
  id: 'Tzr2NafTxJfR',
  title: 'Form with slider question',
  key: 'formWithSliderQuestion',
  definition_id: '',
  release_id: '',
  questions: [
    {
      id: 'XAgYxu_kbDPj',
      title: 'This is slider question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsSliderQuestion',
      dataPointValueType: DataPointValueType.Number,
      options: [],
      questionType: QuestionType.Input,
      userQuestionType: UserQuestionType.Slider,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
        slider: {
          min: 0,
          max: 10,
          step_value: 1,
          display_marks: false,
          min_label: '',
          max_label: '',
          is_value_tooltip_on: false,
          show_min_max_values: false,
        },
      },
    },
    {
      id: '5KMcDYtoz0rr',
      title: 'This is number question',
      definition_id: 'Kzr2NafTxJfR',
      key: 'thisIsNumberQuestion',
      dataPointValueType: DataPointValueType.Number,
      options: [],
      questionType: QuestionType.Input,
      userQuestionType: UserQuestionType.Number,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
  ],
}
