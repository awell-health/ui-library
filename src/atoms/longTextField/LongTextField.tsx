import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import classes from './longTextField.module.scss'
import { QuestionLabel } from '../questionLabel'

export interface LongTextFieldProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  /**
   * sets label of the button
   */
  label?: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * change event handler
   */
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  /**
   * value for controlled component
   */
  value?: string
  /**
   * Is the question required?
   */
  mandatory?: boolean
}

export const LongTextField = ({
  onChange,
  id,
  label,
  mandatory,
  ...props
}: LongTextFieldProps): JSX.Element => {
  const DEFAULT_ROWS = 4
  return (
    <div className={classes.awell_long_text_field_wrapper}>
      {label && <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />}
      <textarea
        {...props}
        id={id}
        rows={DEFAULT_ROWS}
        className={classes.awell_long_text_field}
        onChange={onChange}
        dir="ltr"
      />
    </div>
  )
}
