import React, { LabelHTMLAttributes } from 'react'
import classes from './questionLabel.module.scss'

export interface QuestionLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Label of the question
   */
  label: string
  /**
   * Is the question mandatory?
   */
  mandatory?: boolean
}

export const QuestionLabel = ({
  label,
  mandatory = false,
  ...props
}: QuestionLabelProps): JSX.Element => {
  return (
    <label
      {...props}
      className={`${classes.label} awell__question_label`}
      id="awell__question_label"
    >
      <span>{label}</span>{' '}
      {mandatory && <span className={classes.asterix}>*</span>}
    </label>
  )
}
