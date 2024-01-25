/* eslint-disable no-case-declarations */
import { Controller } from 'react-hook-form'
import { FormError, SliderQuestionConfig, UserQuestionType } from '../../types'
import { SingleChoiceQuestion } from '../singleChoiceQuestion'
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion'
import {
  LongTextField,
  InputField,
  Text,
  RangeInput,
  Description,
  Select,
} from '../../atoms'
import classes from './question.module.scss'
import React, { useLayoutEffect, useState } from 'react'
import { QuestionDataProps, QuestionProps } from './types'
import { PhoneInputField } from '../../atoms/phoneInputField'
import { CountryIso2 } from '../../hooks/useValidate'
import { isNil, noop } from 'lodash'

const AUTO_PROGRESS_DELAY = 850 // in milliseconds

export const QuestionData = ({
  question,
  control,
  getValues,
  labels,
  inputAutoFocus = false,
  submitAndMoveToNextQuestion = noop,
  onAnswerChange = noop,
  shouldAutoProgress = () => false,
}: QuestionDataProps): JSX.Element => {
  const config = question?.questionConfig

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
                    value: '1',
                    label: labels.yes_label,
                  },
                  {
                    id: `${question.id}-no`,
                    value: '0',
                    label: labels.no_label,
                  },
                ]}
                onChange={(data) => {
                  onChange(data)
                  if (value !== data) {
                    onAnswerChange()
                    if (shouldAutoProgress(question)) {
                      setTimeout(
                        () => submitAndMoveToNextQuestion(),
                        AUTO_PROGRESS_DELAY
                      )
                    }
                  }
                }}
                questionId={question.id}
                value={value}
                mandatory={config?.mandatory}
                showFlickerOnSelected={shouldAutoProgress(question)}
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
                    placeholder: labels.select?.search_placeholder,
                    noOptions: labels.select?.no_options,
                  }}
                  onChange={(data) => {
                    onChange(data)
                    if (value !== data) {
                      onAnswerChange()
                    }
                  }}
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
                onChange={(data) => {
                  onChange(data)
                  if (value !== data) {
                    onAnswerChange()
                  }
                }}
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
                    placeholder: labels.select?.search_placeholder,
                    noOptions: labels.select?.no_options,
                  }}
                  onChange={(data) => {
                    onChange(data)
                    onAnswerChange()
                  }}
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
                onChange={(data) => {
                  onChange(data)

                  if (value !== data) {
                    onAnswerChange()
                    if (shouldAutoProgress(question)) {
                      setTimeout(
                        () => submitAndMoveToNextQuestion(),
                        AUTO_PROGRESS_DELAY
                      )
                    }
                  }
                }}
                showFlickerOnSelected={shouldAutoProgress(question)}
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
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={inputAutoFocus}
              onChange={(e) => {
                onChange(e.target.value)
                onAnswerChange()
              }}
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
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={inputAutoFocus}
              type="number"
              onChange={(e) => {
                onChange(e.target.value)
                onAnswerChange()
              }}
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
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={inputAutoFocus}
              type="text"
              onChange={(e) => {
                onChange(e.target.value)
                onAnswerChange()
              }}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={config?.mandatory}
            />
          )}
        />
      )
    case UserQuestionType.Telephone:
      const availableCountries = (config?.phone?.available_countries ?? [])
        .map((c) => c?.toLocaleLowerCase())
        .filter((x) => !isNil(x)) as Array<CountryIso2>

      const initialCountry: CountryIso2 =
        (config?.phone?.default_country?.toLocaleLowerCase() as CountryIso2) ??
        'gb'

      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <PhoneInputField
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={inputAutoFocus}
              onChange={(e) => {
                onChange(e.target.value)
                onAnswerChange()
              }}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={question.questionConfig?.mandatory}
              availableCountries={availableCountries}
              initialCountry={initialCountry}
            />
          )}
        />
      )
    case UserQuestionType.Slider:
      return (
        <Controller
          name={question.id}
          control={control}
          rules={{
            required: config?.mandatory,
            validate: (value) => {
              if (config?.mandatory && (value === '' || value === undefined)) {
                return false
              }
              return true
            },
          }}
          render={({ field: { onChange, value } }) => {
            return (
              <RangeInput
                label={question.title}
                onChange={(e) => {
                  onChange(e.target.value)
                  onAnswerChange()
                }}
                touchTooltipLabel={labels.slider?.tooltip_guide}
                id={question.id}
                sliderConfig={(config as SliderQuestionConfig)?.slider}
                value={value === '' ? undefined : value}
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
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={inputAutoFocus}
                type="date"
                label={question.title}
                onChange={(e) => {
                  onChange(e.target.value)
                  onAnswerChange()
                }}
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
  labels = {
    yes_label: 'Yes',
    no_label: 'No',
    slider: {
      tooltip_guide: 'Touch to select a value',
    },
  },
  inputAutoFocus = false,
  submitAndMoveToNextQuestion,
  onAnswerChange,
  shouldAutoProgress,
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
        inputAutoFocus={inputAutoFocus}
        submitAndMoveToNextQuestion={submitAndMoveToNextQuestion}
        onAnswerChange={onAnswerChange}
        shouldAutoProgress={shouldAutoProgress}
      />

      {currentError && (
        <div
          className={`${classes.error} ${question.userQuestionType === UserQuestionType.Slider
              ? classes.slider_error
              : ''
            }`}
        >
          <Text variant="textSmall" color="var(--awell-signalError100)">
            {currentError.error}
          </Text>
        </div>
      )}
    </div>
  )
}
