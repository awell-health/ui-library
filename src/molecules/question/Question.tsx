import { Controller } from 'react-hook-form'
import {
  FormError,
  QuestionConfig,
  QuestionType,
  SliderQuestionConfig,
} from '../../types'
import { SingleChoiceQuestion } from '../singleChoiceQuestion'
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion'
import { LongTextField } from '../../atoms/longTextField'
import { InputField } from '../../atoms/inputField'
import classes from './question.module.scss'
import React, { useLayoutEffect, useState } from 'react'
import { Label } from '../../atoms/label'
import { Text } from '../../atoms/typography'
import { RangeInput } from '../../atoms/rangeInput'
import { DatePicker } from '../../atoms/datePicker'
import { Description } from '../../atoms/description'
import { format } from 'date-fns'
import { QuestionDataProps, QuestionProps } from './types'

export const QuestionData = ({
  question,
  control,
  getValues,
}: QuestionDataProps): JSX.Element => {
  const config: QuestionConfig | SliderQuestionConfig | undefined =
    question?.questionConfig
  switch (question.userQuestionType) {
    case QuestionType.YesNo:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => {
            return (
              <SingleChoiceQuestion
                options={[
                  { id: `${question.id}-yes`, value: true, label: 'yes' },
                  { id: `${question.id}-no`, value: false, label: 'no' },
                ]}
                onChange={onChange}
                value={value}
              />
            )
          }}
        />
      )
    case QuestionType.MultipleSelect:
    case QuestionType.MultipleChoice:
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
            return (
              <MultipleChoiceQuestion
                options={question.options}
                onChange={onChange}
                values={value}
              />
            )
          }}
        />
      )
    case QuestionType.LongText:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => (
            <LongTextField
              onChange={(e) => {
                onChange(e.target.value)
              }}
              label={question.title}
              id={question.id}
              value={value}
              hideLabel
            />
          )}
        />
      )
    case QuestionType.Number:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => (
            <InputField
              type="number"
              onChange={(e) => {
                onChange(e.target.value)
              }}
              label={question.title}
              id={question.id}
              value={value}
              hideLabel
            />
          )}
        />
      )
    case QuestionType.ShortText:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange } }) => (
            <InputField
              type="text"
              onChange={(e) => {
                onChange(e.target.value)
              }}
              label={question.title}
              id={question.id}
              hideLabel
            />
          )}
        />
      )
    case QuestionType.Slider:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange } }) => {
            return (
              <RangeInput
                onChange={onChange}
                id={question.id}
                sliderConfig={(config as SliderQuestionConfig)?.slider}
              />
            )
          }}
        />
      )
    case QuestionType.Date:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue={format(new Date(), 'yyyy-MM-dd')}
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => {
            const dateValue = value ? new Date(value) : new Date()
            return (
              <DatePicker
                onChange={onChange}
                id={question.id}
                value={dateValue}
              />
            )
          }}
        />
      )
    case QuestionType.Description:
      return <Description nodes={question.title} />
    default:
      return <div>TO BE DONE</div>
  }
}

export const Question = ({
  question,
  control,
  getValues,
  errors,
}: QuestionProps): JSX.Element => {
  const [isVisible, setVisible] = useState(0)
  const style = { '--awell-question-opacity': isVisible } as React.CSSProperties

  useLayoutEffect(() => {
    setTimeout(() => {
      setVisible(1)
    }, 0)
  }, [])

  const currentError = errors.find(({ id }: FormError) => id === question.id)
  const showLabel = question.userQuestionType !== QuestionType.Description

  return (
    <div style={style} className={classes.awell_question}>
      {showLabel && (
        <Label
          htmlFor={question.id}
          label={question.title}
          mandatory={question?.questionConfig?.mandatory}
        />
      )}

      <QuestionData
        question={question}
        control={control}
        getValues={getValues}
      />

      <div className={classes.error}>
        {currentError && (
          <Text variant="textSmall" color="var(--awell-signalError100)">
            {currentError.error}
          </Text>
        )}
      </div>
    </div>
  )
}
