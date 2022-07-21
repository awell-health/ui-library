import React, { ChangeEvent, useState } from 'react'
import classes from './multipleChoiceQuestion.module.scss'
import { CheckboxButton } from '../../atoms/checkboxButton'

interface MultipleChoiceQuestionProps {
  question: any
  onChange: (newValue: Array<string | number>) => void
  values: Array<any>
}
export const MultipleChoiceQuestion = ({
  question,
  onChange,
  values = [],
}: MultipleChoiceQuestionProps): JSX.Element => {
  const [checkedOptions, setCheckedOptions] = useState<Array<any>>(values)
  const handleSelectOption = (
    event: ChangeEvent<HTMLInputElement>,
    option: any
  ) => {
    let newCheckedOptions = []
    if (event.target.checked) {
      newCheckedOptions = [...checkedOptions, option]
    } else {
      newCheckedOptions = [checkedOptions.filter((opt) => option.id !== opt.id)]
    }
    setCheckedOptions(newCheckedOptions)
    onChange(newCheckedOptions)
  }

  return (
    <fieldset className={classes.awell_multiple_choice_question}>
      {(question.options || []).map((option: any) => (
        <CheckboxButton
          onChange={(event) => handleSelectOption(event, option)}
          label={option.label}
          id={option.id}
          checked={checkedOptions.includes(option)}
        />
      ))}
    </fieldset>
  )
}
