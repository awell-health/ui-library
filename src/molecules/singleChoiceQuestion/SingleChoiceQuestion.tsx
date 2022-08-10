import React, { useState, useEffect } from 'react'
import classes from './singleChoiceQuestion.module.scss'
import { RadioButton } from '../../atoms'
import { AnswerOption } from '../../types'
import { QuestionLabel } from '../../atoms/questionLabel'

export interface SingleChoiceQuestionProps {
  label: string
  options: Array<AnswerOption>
  value: AnswerOption
  onChange: (newValue: AnswerOption) => void
  /**
   * Is the question required?
   */
  mandatory?: boolean
}

export const SingleChoiceQuestion = ({
  label,
  options,
  onChange,
  value,
  mandatory,
}: SingleChoiceQuestionProps): JSX.Element => {
  const [checkedOption, setCheckedOption] = useState<AnswerOption>(value)

  useEffect(() => {
    onChange(checkedOption)
  }, [checkedOption])

  const handleSelectOption = (option: AnswerOption) => {
    setCheckedOption(option)
  }

  return (
    <div>
      <QuestionLabel label={label} mandatory={mandatory} />
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
    </div>
  )
}
