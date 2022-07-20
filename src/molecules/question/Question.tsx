import { Controller } from 'react-hook-form'
import { QuestionType } from '../../types'
import { SingleChoiceQuestion } from '../singleChoiceQuestion'
import { MultipleChoiceQuestion } from '../multipleChoiceQuestion'
import { LongTextField } from '../../atoms/longTextField'
import { InputField } from '../../atoms/inputField'
import classes from './question.module.scss'
import React, { useLayoutEffect, useState } from 'react'
import { Label } from '../../atoms/label'

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
            validate: () => {
              return config?.mandatory
                ? getValues(question.id).length > 0
                : true
            },
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
    case QuestionType.Description:
      return (
        <Controller
          name={question.id}
          control={control}
          defaultValue=""
          rules={{ required: config?.mandatory }}
          render={({ field: { onChange, onBlur, value } }) => (
            <LongTextField
              type="text"
              onChange={(e) => {
                onChange(e.target.value)
              }}
              label={''}
              id={question.id}
              value={value}
              hideLabel
            />
          )}
        />
      )
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

  return (
    <div style={style} className={classes.awell_question}>
      <Label htmlFor={props.question.id} label={props.question.title} />
      <QuestionData {...props} />
    </div>
  )
}
