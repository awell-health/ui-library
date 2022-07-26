import React, { ChangeEvent, useState } from 'react'
import classes from './multipleChoiceQuestion.module.scss'
import { CheckboxButton } from '../../atoms/checkboxButton'
import { AnswerOption, Question } from '../../types'

export interface MultipleChoiceQuestionProps {
  question: Question
  onChange: (newValue: Array<string | number>) => void
  values: Array<AnswerOption>
}
export const MultipleChoiceQuestion = ({
  question,
  onChange,
  values = [],
}: MultipleChoiceQuestionProps): JSX.Element => {
  const [checkedOptions, setCheckedOptions] =
    useState<Array<AnswerOption>>(values)
  const handleSelectOption = (
    event: ChangeEvent<HTMLInputElement>,
    option: AnswerOption
  ) => {
    let newCheckedOptions = []
    if (event.target.checked) {
      newCheckedOptions = [...checkedOptions, option]
    } else {
      newCheckedOptions = checkedOptions.filter((opt) => option.id !== opt.id)
    }
    setCheckedOptions(newCheckedOptions)
    //@ts-ignore
    onChange(newCheckedOptions)
  }

  return (
    <fieldset className={classes.awell_multiple_choice_question}>
      {(question.options || []).map((option: AnswerOption) => (
        <CheckboxButton
          key={option.id}
          onChange={(event) => handleSelectOption(event, option)}
          label={option.label}
          id={option.id}
          checked={checkedOptions.includes(option)}
        />
      ))}
    </fieldset>
  )
}
