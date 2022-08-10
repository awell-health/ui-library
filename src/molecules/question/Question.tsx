import { Controller } from 'react-hook-form'
import {
  FormError,
  QuestionConfig,
  QuestionType,
  SliderQuestionConfig,
} from '../../types'
import { SingleChoiceQuestion } from '../singleChoiceQuestion'
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion'
import {
  LongTextField,
  InputField,
  Text,
  RangeInput,
  DatePicker,
  Description,
} from '../../atoms'
import classes from './question.module.scss'
import React, { useLayoutEffect, useState } from 'react'
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
                label={question.title}
                options={[
                  { id: `${question.id}-yes`, value: true, label: 'yes' },
                  { id: `${question.id}-no`, value: false, label: 'no' },
                ]}
                onChange={(data) => onChange(data)}
                value={value}
                mandatory={question.questionConfig?.mandatory}
              />
            )
          }}
        />
      )
    case QuestionType.MultipleSelect:
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
                label={question.title}
                options={question.options}
                onChange={(data) => onChange(data)}
                values={value}
                mandatory={question.questionConfig?.mandatory}
              />
            )
          }}
        />
      )
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
              <SingleChoiceQuestion
                label={question.title}
                options={question.options}
                onChange={(data) => onChange(data)}
                value={value}
                mandatory={question.questionConfig?.mandatory}
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
              onChange={(e) => onChange(e.target.value)}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={question.questionConfig?.mandatory}
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
              onChange={(e) => onChange(e.target.value)}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={question.questionConfig?.mandatory}
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
          render={({ field: { onChange, value } }) => (
            <InputField
              type="text"
              onChange={(e) => onChange(e.target.value)}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={question.questionConfig?.mandatory}
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
          render={({ field: { onChange, value } }) => {
            return (
              <RangeInput
                label={question.title}
                onChange={(e) => onChange(e.target.value)}
                id={question.id}
                sliderConfig={(config as SliderQuestionConfig)?.slider}
                value={value}
                mandatory={question.questionConfig?.mandatory}
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
                onChange={(data) => onChange(data)}
                id={question.id}
                value={dateValue}
                mandatory={question.questionConfig?.mandatory}
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

  return (
    <div style={style} className={classes.awell_question}>
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
