import React, { useState, useEffect } from 'react'
import classes from './singleChoiceQuestion.module.scss'
import { RadioButton } from '../../atoms'
import { Option } from '../../types'
import { QuestionLabel } from '../../atoms/questionLabel'

export interface SingleChoiceQuestionProps {
  questionId: string
  label: string
  options: Array<Option>
  value: Option | null
  onChange: (newValue: Option | null) => void
  /**
   * Is the question required?
   */
  mandatory?: boolean
  /**
   * For auto-progressed questions, we can highlight
   * or flicker the selected option for increased visibility
   */
  showFlickerOnSelected?: boolean
}

export const SingleChoiceQuestion = ({
  questionId,
  label,
  options,
  onChange,
  value,
  mandatory,
  showFlickerOnSelected = false,
}: SingleChoiceQuestionProps): JSX.Element => {
  const [checkedOption, setCheckedOption] = useState<Option | null>(value)

  // controls whether should we show a flicker animation or not
  const [flickerAnimation, setFlickerAnimation] = useState<boolean>(false)

  useEffect(() => {
    onChange(checkedOption)

    // We only show animation if selected option has changed
    if (value?.id !== checkedOption?.id) {
      setFlickerAnimation(true)
    }
    return () => {
      setFlickerAnimation(false)
    }
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
            checked={option.id === checkedOption?.id}
            name={questionId}
            customWrapperClass={
              flickerAnimation &&
              option.id === checkedOption?.id &&
              showFlickerOnSelected
                ? classes.animate_flicker
                : ''
            }
          />
        ))}
      </fieldset>
    </div>
  )
}
