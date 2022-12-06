import { Form } from '../../../types'

export const form: Form = {
  id: 'Kzr2NafTxJfR',
  title: 'Example form',
  key: 'exampleForm',
  questions: [
    {
      id: 'x5bgJqOltmK3',
      title: 'Single select question - Not required',
      form_id: 'Kzr2NafTxJfR',
      key: 'singleSelectQuestion',
      dataPointValueType: 'NUMBER',
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
      questionType: 'MULTIPLE_CHOICE',
      userQuestionType: 'MULTIPLE_CHOICE',
      rule_id: null,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'x5bgJqOltmK3',
      title: 'Single select question - required',
      form_id: 'Kzr2NafTxJfR',
      key: 'singleSelectQuestion',
      dataPointValueType: 'NUMBER',
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
      questionType: 'MULTIPLE_CHOICE',
      userQuestionType: 'MULTIPLE_CHOICE',
      rule_id: null,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
        slider: null,
      },
    },
    {
      id: 'HyIaUkgDcXwR',
      title: 'This is multiple select question',
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsMultipleSelectQuestion',
      dataPointValueType: 'NUMBERS_ARRAY',
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
      questionType: 'MULTIPLE_CHOICE',
      userQuestionType: 'MULTIPLE_SELECT',
      rule_id: null,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'VkL1vrscT5MV',
      title: 'This is yes or no question',
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsYesOrNoQuestion',
      dataPointValueType: 'BOOLEAN',
      options: [],
      questionType: 'INPUT',
      userQuestionType: 'YES_NO',
      rule_id: null,
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
      form_id: 'Kzr2NafTxJfR',
      key: 'typePChildrenTextThisBoldTrueTextIsItalicTrueTextTextRichTextStrikethroughTrueTextTextDescriptionUnderlineTrue',
      dataPointValueType: null,
      options: [],
      questionType: 'NO_INPUT',
      userQuestionType: 'DESCRIPTION',
      rule_id: null,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'XAgYxu_kbDPj',
      title: 'This is slider question',
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsSliderQuestion',
      dataPointValueType: 'NUMBER',
      options: [],
      questionType: 'INPUT',
      userQuestionType: 'SLIDER',
      rule_id: null,
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
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsNumberQuestion',
      dataPointValueType: 'NUMBER',
      options: [],
      questionType: 'INPUT',
      userQuestionType: 'NUMBER',
      rule_id: null,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: 'U99uUQ_Jp5Jb',
      title: 'This is short text question',
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsShortTextQuestion',
      dataPointValueType: 'STRING',
      options: [],
      questionType: 'INPUT',
      userQuestionType: 'SHORT_TEXT',
      rule_id: null,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
    {
      id: '6mv3n9HaXFTU',
      title: 'This is long text question',
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsLongTextQuestion',
      dataPointValueType: 'STRING',
      options: [],
      questionType: 'INPUT',
      userQuestionType: 'LONG_TEXT',
      rule_id: null,
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
  questions: [
    {
      id: 'x5bgJqOltmK3',
      title: 'Single select question #1',
      form_id: 'Kzr2NafTxJfR',
      key: 'singleSelectQuestion',
      dataPointValueType: 'NUMBER',
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
        }
      ],
      questionType: 'MULTIPLE_CHOICE',
      userQuestionType: 'MULTIPLE_CHOICE',
      rule_id: null,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
        slider: null,
      },
    },
    {
      id: 'x5bgJqOltmK3',
      title: 'Single select question #2',
      form_id: 'Kzr2NafTxJfR',
      key: 'singleSelectQuestion',
      dataPointValueType: 'NUMBER',
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
        }
      ],
      questionType: 'MULTIPLE_CHOICE',
      userQuestionType: 'MULTIPLE_CHOICE',
      rule_id: null,
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
  questions: [
    {
      id: 'XAgYxu_kbDPj',
      title: 'This is slider question',
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsSliderQuestion',
      dataPointValueType: 'NUMBER',
      options: [],
      questionType: 'INPUT',
      userQuestionType: 'SLIDER',
      rule_id: null,
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
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsNumberQuestion',
      dataPointValueType: 'NUMBER',
      options: [],
      questionType: 'INPUT',
      userQuestionType: 'NUMBER',
      rule_id: null,
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
  questions: [
    {
      id: 'XAgYxu_kbDPj',
      title: 'This is date question',
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsDateQuestion',
      dataPointValueType: 'DATE',
      options: [],
      questionType: 'INPUT',
      userQuestionType: 'DATE',
      rule_id: null,
      questionConfig: {
        recode_enabled: false,
        mandatory: true,
      },
    },
    {
      id: '5KMcDYtoz0rr',
      title: 'This is number question',
      form_id: 'Kzr2NafTxJfR',
      key: 'thisIsNumberQuestion',
      dataPointValueType: 'NUMBER',
      options: [],
      questionType: 'INPUT',
      userQuestionType: 'NUMBER',
      rule_id: null,
      questionConfig: {
        recode_enabled: false,
        mandatory: false,
        slider: null,
      },
    },
  ],
}
