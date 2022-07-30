import React, { ChangeEvent, useState, useEffect } from 'react'
import classes from './multipleChoiceQuestion.module.scss'
import { CheckboxButton } from '../../atoms/checkboxButton'
import { AnswerOption } from '../../types'

/**
 * @TODO: Check if the type for onChange is correct. I think I changed it from
 * array of option values to array of AnswerOption (object), but I don't know
 * how to check if this will have a negative impact
 */
export interface MultipleChoiceQuestionProps {
  options: Array<AnswerOption>
  onChange: (newValue: Array<AnswerOption>) => void
  values: Array<AnswerOption>
}

export const MultipleChoiceQuestion = ({
  options = [],
  onChange,
  values = [],
}: MultipleChoiceQuestionProps): JSX.Element => {
  const [checkedOptions, setCheckedOptions] =
    useState<Array<AnswerOption>>(values)

  useEffect(() => {
    setCheckedOptions(values)
  }, [values])

  useEffect(() => {
    onChange(checkedOptions)
  }, [checkedOptions])

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
  }

  return (
    <fieldset className={classes.awell_multiple_choice_question}>
      {options.map((option: AnswerOption) => (
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
