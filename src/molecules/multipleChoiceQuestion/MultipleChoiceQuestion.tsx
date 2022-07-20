import React, { useState } from 'react'
import { Text } from '../../atoms/typography'
import classes from './multipleChoiceQuestion.module.scss'
import { CheckboxButton } from '../../atoms/checkboxButton'

interface MultipleChoiceQuestionProps {
  question: any
  onChange: (newValue: Array<string | number>) => void
}
export const MultipleChoiceQuestion = ({
  question,
  onChange,
}: MultipleChoiceQuestionProps): JSX.Element => {
  const [checkedOptions, setCheckedOptions] = useState<Array<any>>([])

  const handleSelectOption = (option: any) => {
    if (!checkedOptions.includes(option)) {
      setCheckedOptions([...checkedOptions, option])
    } else {
      setCheckedOptions(checkedOptions.filter((opt) => option.id !== opt.id))
    }
    onChange(checkedOptions)
  }

  return (
    <fieldset className={classes.awell_multiple_choice_question}>
      {(question.options || []).map((option: any) => (
        <CheckboxButton
          onChange={handleSelectOption}
          label={option.label}
          id={option.id}
          checked={checkedOptions.includes(option)}
        />
      ))}
      {/*<Text color="var(--awell-red100)">ADD error</Text>*/}
    </fieldset>
  )
}
