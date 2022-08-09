import React, { useState, useEffect } from 'react'
import classes from './singleChoiceQuestion.module.scss'
import { RadioButton } from '../../atoms'
import { Option } from '../../types'

export interface SingleChoiceQuestionProps {
  options: Array<Option>
  value: Option
  onChange: (newValue: Option) => void
}
export const SingleChoiceQuestion = ({
  options,
  onChange,
  value,
}: SingleChoiceQuestionProps): JSX.Element => {
  const [checkedOption, setCheckedOption] = useState<Option>(value)

  useEffect(() => {
    onChange(checkedOption)
  }, [checkedOption])

  const handleSelectOption = (option: Option) => {
    setCheckedOption(option)
  }

  return (
    <fieldset className={classes.awell_single_choice_question}>
      {(options || []).map((option: Option) => (
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
