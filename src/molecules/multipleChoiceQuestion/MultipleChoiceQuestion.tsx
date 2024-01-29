import React, { ChangeEvent, useState, useEffect } from 'react'
import classes from './multipleChoiceQuestion.module.scss'
import { CheckboxButton } from '../../atoms/checkboxButton'
import { QuestionLabel } from '../../atoms/questionLabel'

interface OptionStringOrNumberType {
  id: string
  value: string | number
  label: string
}

export interface MultipleChoiceQuestionProps {
  questionId: string
  label: string
  options: Array<OptionStringOrNumberType>
  onChange: (newValue: Array<OptionStringOrNumberType>) => void
  values: Array<OptionStringOrNumberType>
  /**
   * Is the question required?
   */
  mandatory?: boolean
}

export const MultipleChoiceQuestion = ({
  questionId,
  label,
  options = [],
  onChange,
  values = [],
  mandatory,
}: MultipleChoiceQuestionProps): JSX.Element => {
  const [checkedOptions, setCheckedOptions] =
    useState<Array<OptionStringOrNumberType>>(values)

  useEffect(() => {
    onChange(checkedOptions)
  }, [checkedOptions])

  const handleSelectOption = (
    event: ChangeEvent<HTMLInputElement>,
    option: OptionStringOrNumberType
  ) => {
    let newCheckedOptions = []
    if (event.target.checked) {
      newCheckedOptions = [...checkedOptions, option]
    } else {
      newCheckedOptions = checkedOptions.filter(
        (opt: OptionStringOrNumberType) => option.id !== opt.id
      )
    }
    setCheckedOptions(newCheckedOptions)
  }

  return (
    <div>
      <QuestionLabel label={label} mandatory={mandatory} />
      <fieldset className={classes.awell_multiple_choice_question}>
        {options.map((option: OptionStringOrNumberType) => (
          <CheckboxButton
            key={option.id}
            onChange={(event) => handleSelectOption(event, option)}
            label={option.label}
            id={option.id}
            checked={checkedOptions.map((c) => c.value).includes(option.value)}
            name={questionId}
          />
        ))}
      </fieldset>
    </div>
  )
}
