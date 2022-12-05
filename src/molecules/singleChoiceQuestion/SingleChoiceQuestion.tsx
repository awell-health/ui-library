import React, { useState, useEffect } from 'react'
import classes from './singleChoiceQuestion.module.scss'
import { RadioButton } from '../../atoms'
import { Option } from '../../types'
import { QuestionLabel } from '../../atoms/questionLabel'

export interface SingleChoiceQuestionProps {
  questionId: string,
  label: string
  options: Array<Option>
  value: Option
  onChange: (newValue: Option) => void
  /**
   * Is the question required?
   */
  mandatory?: boolean
}

export const SingleChoiceQuestion = ({
  questionId,
  label,
  options,
  onChange,
  value,
  mandatory,
}: SingleChoiceQuestionProps): JSX.Element => {
  const [checkedOption, setCheckedOption] = useState<Option>(value)

  useEffect(() => {
    onChange(checkedOption)
  }, [checkedOption])

  const handleSelectOption = (option: Option) => {
    setCheckedOption(option)
  }

  return (
    <div>
      <QuestionLabel label={label} mandatory={mandatory} />
      <fieldset className={classes.awell_single_choice_question}>
        {(options || []).map((option: Option) => (
          <RadioButton
            onChange={() => handleSelectOption(option)}
            label={option.label}
            id={option.id}
            key={option.id}
            checked={option.id === checkedOption.id}
            name={questionId}
          />
        ))}
      </fieldset>
    </div>
  )
}
