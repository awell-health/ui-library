import { Controller } from 'react-hook-form'
import { FormError, SliderQuestionConfig, UserQuestionType } from '../../types'
import { SingleChoiceQuestion } from '../singleChoiceQuestion'
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion'
import {
  LongTextField,
  InputField,
  Text,
  RangeInput,
  DatePicker,
  Description,
  Select,
} from '../../atoms'
import classes from './question.module.scss'
import React, { useLayoutEffect, useState } from 'react'
import { QuestionDataProps, QuestionProps } from './types'
import { PhoneInputField } from '../../atoms/phoneInputField'
import { useValidate } from '../../hooks/useValidate'

export const QuestionData = ({
  question,
  control,
  getValues,
  labels,
  questionTypeConfig,
}: QuestionDataProps): JSX.Element => {
  const config = question?.questionConfig
  const { isValidE164Number } = useValidate()
  switch (question.userQuestionType) {
    case UserQuestionType.YesNo:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => {
            return (
              <SingleChoiceQuestion
                label={question.title}
                options={[
                  {
                    id: `${question.id}-yes`,
                    value: 1,
                    label: labels.yes_label,
                  },
                  { id: `${question.id}-no`, value: 0, label: labels.no_label },
                ]}
                onChange={(data) => onChange(data)}
                questionId={question.id}
                value={value}
                mandatory={config?.mandatory}
              />
            )
          }}
        />
      )
    case UserQuestionType.MultipleSelect:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue={[]}
          rules={{
            validate: () =>
              config?.mandatory ? getValues(question.id).length > 0 : true,
          }}
          render={({ field: { onChange, value } }) => {
            if (config?.use_select === true) {
              return (
                <Select
                  id={question.id}
                  value={value}
                  labels={{
                    questionLabel: question.title,
                    searchPlaceholder: labels.select?.search_placeholder,
                    noOptions: labels.select?.no_options,
                  }}
                  onChange={(data) => onChange(data)}
                  type="multiple"
                  options={question.options ?? []}
                  mandatory={config?.mandatory}
                  showCount
                  filtering
                />
              )
            }

            return (
              <MultipleChoiceQuestion
                label={question.title}
                options={question.options ?? []}
                onChange={(data) => onChange(data)}
                questionId={question.id}
                values={value}
                mandatory={config?.mandatory}
              />
            )
          }}
        />
      )
    case UserQuestionType.MultipleChoice:
      return (
        <Controller
          name={question.id}
          control={control}
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => {
            if (config?.use_select === true) {
              return (
                <Select
                  id={question.id}
                  value={value}
                  labels={{
                    questionLabel: question.title,
                    searchPlaceholder: labels.select?.search_placeholder,
                    noOptions: labels.select?.no_options,
                  }}
                  onChange={(data) => onChange(data)}
                  type="single"
                  options={question.options ?? []}
                  mandatory={config?.mandatory}
                  showCount
                  filtering
                />
              )
            }

            return (
              <SingleChoiceQuestion
                label={question.title}
                options={question.options || []}
                onChange={(data) => onChange(data)}
                questionId={question.id}
                value={value}
                mandatory={config?.mandatory}
              />
            )
          }}
        />
      )
    case UserQuestionType.LongText:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => (
            <LongTextField
              onChange={(e) => onChange(e.target.value)}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={config?.mandatory}
            />
          )}
        />
      )
    case UserQuestionType.Number:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => (
            <InputField
              type="number"
              onChange={(e) => onChange(e.target.value)}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={config?.mandatory}
            />
          )}
        />
      )
    case UserQuestionType.ShortText:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => (
            <InputField
              type="text"
              onChange={(e) => onChange(e.target.value)}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={config?.mandatory}
            />
          )}
        />
      )
    case UserQuestionType.Telephone:
      // eslint-disable-next-line no-case-declarations
      const {
        availableCountries,
        // TODO: setting this to gb as default for now
        initialCountry = 'gb',
        placeholder = '+447810123456',
      } = questionTypeConfig?.TELEPHONE ?? {}
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{
            required: config?.mandatory,
            validate: (value) => {
              if (value === '' && !config?.mandatory) {
                return true
              }
              return isValidE164Number(value)
            },
          }}
          render={({ field: { onChange, value } }) => (
            <PhoneInputField
              onChange={(e) => onChange(e.target.value)}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={question.questionConfig?.mandatory}
              availableCountries={availableCountries}
              initialCountry={initialCountry}
              placeholder={placeholder}
            />
          )}
        />
      )
    case UserQuestionType.Slider:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue={config?.slider?.min}
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => {
            return (
              <RangeInput
                label={question.title}
                onChange={(e) => onChange(e.target.value)}
                id={question.id}
                sliderConfig={(config as SliderQuestionConfig)?.slider}
                value={value}
                mandatory={config?.mandatory}
              />
            )
          }}
        />
      )
    case UserQuestionType.Date:
      return (
        <Controller
          name={question.id}
          control={control}
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => {
            return (
              <InputField
                type="date"
                label={question.title}
                onChange={(data) => onChange(data)}
                id={question.id}
                value={value}
                mandatory={config?.mandatory}
              />
            )
          }}
        />
      )
    case UserQuestionType.Description:
      return <Description content={question.title} />
    default:
      return <div>Question Type Not Implemented</div>
  }
}

export const Question = ({
  question,
  control,
  getValues,
  errors,
  questionTypeConfig,
  labels = {
    yes_label: 'Yes',
    no_label: 'No',
  },
}: QuestionProps): JSX.Element => {
  const [isVisible, setVisible] = useState(0)
  const style = { '--awell-question-opacity': isVisible } as React.CSSProperties

  useLayoutEffect(() => {
    setTimeout(() => {
      setVisible(1)
    }, 0)
  }, [])

  const currentError = errors.find(({ id }: FormError) => id === question.id)

  return (
    <div style={style} className={classes.awell_question}>
      <QuestionData
        question={question}
        control={control}
        getValues={getValues}
        labels={labels}
        questionTypeConfig={questionTypeConfig}
      />

      {currentError && (
        <div className={classes.error}>
          <Text variant="textSmall" color="var(--awell-signalError100)">
            {currentError.error}
          </Text>
        </div>
      )}
    </div>
  )
}
