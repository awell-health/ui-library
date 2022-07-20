import React, { useState } from 'react'
import classes from './singleChoiceQuestion.module.scss'
import { RadioButton } from '../../atoms/radioButton'

interface SingleChoiceQuestionProps {
  question: any
  onChange: (newValue: Array<string | number>) => void
}
export const SingleChoiceQuestion = ({
  question,
  onChange,
}: SingleChoiceQuestionProps): JSX.Element => {
  const [checkedOption, setCheckedOption] = useState<any>([])

  const handleSelectOption = (option: any) => {
    setCheckedOption(option)
    onChange(option)
  }

  return (
    <fieldset className={classes.awell_single_choice_question}>
      {(question.options || []).map((option: any) => (
        <RadioButton
          onChange={handleSelectOption}
          label={option.label}
          id={option.id}
          checked={option.id === checkedOption.id}
        />
      ))}
      {/*<Text color="var(--awell-red100)">ADD error</Text>*/}
    </fieldset>
  )
}
