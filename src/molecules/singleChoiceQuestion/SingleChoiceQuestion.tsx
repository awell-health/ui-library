import React, { useState } from 'react'
import classes from './singleChoiceQuestion.module.scss'
import { RadioButton } from '../../atoms/radioButton'
import { AnswerOption } from '../../types'

interface SingleChoiceQuestionProps {
  options: Array<AnswerOption>
  value: AnswerOption
  onChange: (newValue: AnswerOption) => void
}
export const SingleChoiceQuestion = ({
  options,
  onChange,
  value,
}: SingleChoiceQuestionProps): JSX.Element => {
  const [checkedOption, setCheckedOption] = useState<AnswerOption>(value)
  const handleSelectOption = (option: AnswerOption) => {
    setCheckedOption(option)
    onChange(option)
  }

  return (
    <fieldset className={classes.awell_single_choice_question}>
      {(options || []).map((option: AnswerOption) => (
        <RadioButton
          onChange={() => handleSelectOption(option)}
          label={option.label}
          id={option.id}
          key={option.id}
          checked={option.id === checkedOption.id}
        />
      ))}
    </fieldset>
  )
}
