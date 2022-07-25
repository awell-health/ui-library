import { Controller } from 'react-hook-form'
import { QuestionType } from '../../types'
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
import { Description } from '../../atoms/Description'

export const QuestionData = ({
  question,
  control,
  getValues,
}: any): JSX.Element => {
  const config = question?.questionConfig
  switch (question.userQuestionType) {
    case QuestionType.YesNo:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <SingleChoiceQuestion
                options={[
                  { id: `${question.id}-yes`, value: true, label: 'yes' },
                  { id: `${question.id}-no`, value: false, label: 'no' },
                ]}
                onChange={onChange}
                values={value}
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
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <MultipleChoiceQuestion
                question={question}
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
          render={({ field: { onChange, onBlur, value } }) => (
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
          render={({ field: { onChange, onBlur, value } }) => (
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
          render={({ field: { onChange, onBlur, value } }) => (
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
          render={({ field: { onChange, onBlur, value } }) => (
            <RangeInput
              onChange={onChange}
              id={question.id}
              sliderConfig={config.slider}
            />
          )}
        />
      )
    case QuestionType.Date:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePicker onChange={onChange} id={question.id} />
          )}
        />
      )
    case QuestionType.Description:
      return <Description nodes={question.title} />
    default:
      return <div>TO BE DONE</div>
  }
}

export const Question = ({ ...props }) => {
  const [isVisible, setVisible] = useState(0)
  const style = { '--awell-question-opacity': isVisible } as React.CSSProperties

  useLayoutEffect(() => {
    setTimeout(() => {
      setVisible(1)
    }, 0)
  }, [])

  const showLabel = props.question.userQuestionType !== QuestionType.Description
  return (
    <div style={style} className={classes.awell_question}>
      {showLabel && (
        <Label
          htmlFor={props.question.id}
          label={props.question.title}
          mandatory={props.question?.questionConfig?.mandatory}
        />
      )}
      <QuestionData {...props} />

      <div className={classes.error}>
        {props.error && (
          <Text variant="textSmall" color="var(--awell-signalError100)">
            {props.error}
          </Text>
        )}
      </div>
    </div>
  )
}
