import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
// @ts-ignore
import classes from './longTextField.module.scss'

export interface LongTextFieldProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  /**
   * change event handlers
   */
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  /**
   * sets label of the button
   */
  label: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * value for controlled component
   */
  value: string
  /**
   * hide label - use only when label is provided in other manner
   */
  hideLabel?: boolean
}

export const LongTextField = ({
  onChange,
  id,
  label,
  hideLabel,
  ...props
}: LongTextFieldProps): JSX.Element => {
  return (
    <div className={classes.awell_long_text_field_wrapper}>
      {!hideLabel && <label htmlFor={id}>{label}</label>}
      <textarea
        {...props}
        id={id}
        className={classes.awell_long_text_field}
        onChange={onChange}
      />
    </div>
  )
}
