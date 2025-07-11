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
import { Attachment, QuestionDataProps, QuestionProps } from './types'
import { PhoneInputField } from '../../atoms/phoneInputField'
import { CountryIso2 } from '../../hooks/useValidate'
import { isEmpty, isNil, noop } from 'lodash'
import { getMinValueForDateInput } from './helpers/getMinValueForDateInput'
import { getMaxValueForDateInput } from './helpers/getMaxValueForDateInput'
import { getMinValueForNumberInput } from './helpers/getMinValueForNumberInput'
import { getMaxValueForNumberInput } from './helpers/getMaxValueForNumberInput'
import { isValidEmail } from './helpers/isValidEmail'
import { useICDClassificationList } from '../../hooks/useIcdClassificationList'
import { custom_json_parser } from '../../utils/custom_json_parser'
import { areAttachmentsValid } from './helpers/areAttachmentsValid'
import { SingleFileInputField } from '../../atoms/fileInputField/SingleFileInputField'
import { isAttachmentValid } from './helpers/isAttachmentValid'

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
  onFileUpload,
}: QuestionDataProps): JSX.Element => {
  const config = question?.questionConfig
  const {
    options: icdClassificationOptions,
    loading: optionsLoading,
    onIcdClassificationSearchChange,
  } = useICDClassificationList(question.id)

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
              min={getMinValueForNumberInput(config?.number)}
              max={getMaxValueForNumberInput(config?.number)}
            />
          )}
        />
      )
    case UserQuestionType.ShortText: {
      const hasValidInputValidation =
        !!config?.input_validation &&
        typeof config?.input_validation?.pattern === 'string' &&
        config?.input_validation?.pattern.length > 0
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{
            required: config?.mandatory,
            ...(hasValidInputValidation && {
              pattern: {
                value: new RegExp(config?.input_validation?.pattern ?? ''),
                message:
                  config?.input_validation?.helper_text ||
                  'The input value is invalid.',
              },
            }),
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
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
              {error && (
                <Text variant="textSmall" color="var(--awell-signalError100)">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      )
    }
    case UserQuestionType.Telephone:
      const availableCountries = (config?.phone?.available_countries ?? [])
        .map((c) => c?.toLocaleLowerCase())
        .filter((x) => !isNil(x)) as Array<CountryIso2>

      const initialCountry: CountryIso2 =
        (config?.phone?.default_country?.toLocaleLowerCase() as CountryIso2) ??
        'us'

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
              value={value ?? ''}
              mandatory={question.questionConfig?.mandatory}
              availableCountries={availableCountries}
              initialCountry={initialCountry}
              forceDialCode={true}
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

    case UserQuestionType.Email:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{
            required: config?.mandatory,
            validate: (value: string): string | boolean => {
              if (!isEmpty(value)) {
                return isValidEmail(value)
              }
              return true
            },
          }}
          render={({ field: { onChange, value } }) => (
            <InputField
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={inputAutoFocus}
              type="email"
              onChange={(e) => {
                onChange(e.target.value)
                onAnswerChange()
              }}
              label={question.title}
              id={question.id}
              value={value}
              mandatory={config?.mandatory ?? false}
              placeholder="name@example.com"
            />
          )}
        />
      )
    case UserQuestionType.Date:
      return (
        <Controller
          name={question.id}
          control={control}
          rules={{
            required: config?.mandatory,
          }}
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
                min={getMinValueForDateInput(config?.date)}
                max={getMaxValueForDateInput(config?.date)}
              />
            )
          }}
        />
      )

    case UserQuestionType.Icd10Classification:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, value } }) => (
            <>
              <Select
                id={question.id}
                value={value}
                labels={{
                  questionLabel: question.title,
                  placeholder: labels.select?.search_icd_placeholder,
                  noOptions: labels.select?.no_options,
                }}
                onChange={(data) => {
                  onChange(data)
                  onAnswerChange()
                }}
                type="single"
                options={icdClassificationOptions ?? []}
                mandatory={config?.mandatory}
                showCount
                filtering
                onSearch={onIcdClassificationSearchChange}
                loading={optionsLoading}
                allowSearchAfterSelect={true}
                allowEmptyOptionsList={true}
              />
              <span className={classes.awell_question_description}>
                {labels.select?.icd_10_catalogue_description}{' '}
                <a
                  href="https://icd.who.int/browse10/2019/en#/J00"
                  target="blank"
                >
                  {labels.select?.icd_10_catalogue_link}
                </a>
                {'.'}
              </span>
            </>
          )}
        />
      )

    case UserQuestionType.File:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue={[]}
          rules={{
            required: config?.mandatory,
            validate: (value: string) =>
              isAttachmentValid({
                attachmentsValue: value,
                acceptedFileTypes:
                  config?.file_storage?.accepted_file_types ?? [],
                required: config?.mandatory ?? false,
              }),
          }}
          render={({
            field: { onChange: onControllerChange, onBlur, value },
          }) => {
            return (
              <SingleFileInputField
                id={question.id}
                value={custom_json_parser(value as string, '')}
                onChange={(attachment: Attachment | undefined) => {
                  onControllerChange(JSON.stringify(attachment))
                  onAnswerChange()
                }}
                onBlur={onBlur}
                accept={
                  config?.file_storage?.accepted_file_types ?? [
                    'application/pdf',
                  ]
                }
                configSlug={
                  config?.file_storage?.file_storage_config_slug as string
                }
                onFileUpload={onFileUpload}
                label={question.title}
                mandatory={config?.mandatory}
              />
            )
          }}
        />
      )

    case UserQuestionType.Image:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue={[]}
          rules={{
            required: config?.mandatory,
            validate: (value: string) =>
              areAttachmentsValid({
                attachmentsValue: value,
                acceptedFileTypes: ['image/*'],
                required: config?.mandatory ?? false,
              }),
          }}
          render={({
            field: { onChange: onControllerChange, onBlur, value },
          }) => {
            return (
              <SingleFileInputField
                id={question.id}
                value={custom_json_parser(value as string, '')}
                onChange={(attachment: Attachment | undefined) => {
                  onControllerChange(JSON.stringify(attachment))
                  onAnswerChange()
                }}
                onBlur={onBlur}
                accept={
                  config?.file_storage?.accepted_file_types ?? ['image/*']
                }
                configSlug={
                  config?.file_storage?.file_storage_config_slug as string
                }
                onFileUpload={onFileUpload}
                label={question.title}
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
  onFileUpload,
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
        onFileUpload={onFileUpload}
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
