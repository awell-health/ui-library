import { Form } from '../../../../types'
import { DataPointValueType, QuestionType, UserQuestionType } from '../../../../types/question'

export const form: Form = {
  id: 'Kzr2NafTxJfR',
  title: 'Example form',
  key: 'exampleForm',
  definition_id: '',
  release_id: '',
  questions: [
    {
      id: 'x5bgJqOltmK3',
      title: 'Single select question - Not required',
      definition_id: 'Kzr2NafTxJfR',
      key: 'singleSelectQuestion',
      dataPointValueType: DataPointValueType.Number,
      options: [
        {
          id: '1',
          label: 'Option 1',
          value: 0,
        },
        {
          id: '2',
          label: 'Option 2',
          value: 1,
        },
        {
          id: '3',
          label: 'Option 3',
          value: 3,
        },
        {
          id: '4',
          label: 'Option 4',
          value: 4,
        },
        {
          id: '5',
          label: 'Option 5',
          value: 5,
        },
        {
          id: '6',
          label:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
          value: 6,
        },
        {
          id: '7',
          label: 'Option 7',
          value: 7,
        },
        {
          id: '8',
          label: 'Option 8',
          value: 8,
        },
        {
          id: '9',
          label: 'Option 9',
          value: 9,
        },
        {
          id: '10',
          label: 'Option 10',
          value: 10,
        },
        {
          id: '11',
          label: 'Option 11',
          value: 11,
        },
        {
          id: '12',
          label: 'Option 12',
          value: 12,
        },
        {
          id: '13',
          label: 'Option 13',
          value: 13,
        },
        {
          id: '14',
          label: 'Option 14',
          value: 14,
        },
        {
          id: '15',
          label: 'Option 15',
          value: 15,
        },
        {
          id: '16',
          label: 'Option 16',
          value: 16,
        },
        {
          id: '17',
          label: 'Option 17',
          value: 17,
        },
        {
          id: '18',
          label: 'Option 18',
          value: 18,
        },
        {
          id: '19',
          label: 'Option 19',
          value: 19,
        },
        {
          id: '20',
          label: 'Option 20',
          value: 20,
        },
      ],
      questionType: QuestionType.MultipleChoice,
      userQuestionType: UserQuestionType.MultipleChoice,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'x5bgJqOltmK3',
      title: 'Single select question - required',
      definition_id: 'Kzr2NafTxJfR',
      key: 'singleSelectQuestion',
      dataPointValueType: DataPointValueType.Number,
      options: [
        {
          id: '1',
          label: 'Option 1',
          value: 0,
        },
        {
          id: '2',
          label: 'Option 2',
          value: 1,
        },
        {
          id: '3',
          label: 'Option 3',
          value: 3,
        },
        {
          id: '4',
          label: 'Option 4',
          value: 4,
        },
        {
          id: '5',
          label: 'Option 5',
          value: 5,
        },
        {
          id: '6',
          label:
            'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
          value: 6,
        },
        {
          id: '7',
          label: 'Option 7',
          value: 7,
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
          label: 'Option 1',
        },
        {
          id: 'RqYicEXp0agy',
          value: 1,
          label: 'Option 2',
        },
        {
          id: 'd_uA9ldC6L8_',
          value: 2,
          label: 'Option 3',
        },
        {
          id: 'ZkhlOC3DfSOF',
          value: 3,
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
      id: 'fSN5BktQ6cOV',
      title:
        '[{"type":"p","children":[{"text":"This ","bold":true},{"text":"is","italic":true},{"text":" "},{"text":"rich text","strikethrough":true},{"text":" "},{"text":"description","underline":true}]}]',
      definition_id: 'Kzr2NafTxJfR',
      key: 'typePChildrenTextThisBoldTrueTextIsItalicTrueTextTextRichTextStrikethroughTrueTextTextDescriptionUnderlineTrue',
      dataPointValueType: null,
      options: [],
      questionType: QuestionType.NoInput,
      userQuestionType: UserQuestionType.Description,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
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
  ],
}

export const formWithTwoRequiredSingleSelectQuestions: Form = {
  id: 'Kzr2NafTxJfR',
  title: 'Example form',
  key: 'exampleForm',
  definition_id: '',
  release_id: '',
  questions: [
    {
      id: 'x5bgJqOltmK3',
      title: 'Single select question #1',
      definition_id: 'Kzr2NafTxJfR',
      key: 'singleSelectQuestion',
      dataPointValueType: DataPointValueType.Number,
      options: [
        {
          id: '1',
          label: 'Answer the first required question',
          value: 0,
        },
        {
          id: '2',
          label: 'Option 2',
          value: 1,
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
      id: 'x5bgJqOltmK3',
      title: 'Single select question #2',
      definition_id: 'Kzr2NafTxJfR',
      key: 'singleSelectQuestion',
      dataPointValueType: DataPointValueType.Number,
      options: [
        {
          id: '1',
          label: 'Option 1',
          value: 0,
        },
        {
          id: '2',
          label: 'Option 2',
          value: 1,
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

export const dateQuestionForm: Form = {
  id: 'Tzr2NafTxJfR',
  title: 'Form with date question',
  key: 'formWithDateQuestion',
  definition_id: '',
  release_id: '',
  questions: [
    {
      id: 'XAgYxu_kbDPj',
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
