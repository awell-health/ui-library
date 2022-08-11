import React, { LabelHTMLAttributes } from 'react'
import classes from './questionLabel.module.scss'

export interface QuestionLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * sets label of the button
   */
  label: string
  /**
   * is the quesiton mandatory?
   */
  mandatory?: boolean
}

export const QuestionLabel = ({
  label,
  mandatory = false,
  ...props
}: QuestionLabelProps): JSX.Element => {
  const DEFAULT_ROWS = 4
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return (
    <label {...props} className={classes.label}>
      {label} {mandatory && <span className={classes.asterix}>*</span>}
    </label>
  )
}
