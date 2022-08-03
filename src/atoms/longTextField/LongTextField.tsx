import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import classes from './longTextField.module.scss'

export interface LongTextFieldProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  /**
   * sets label of the button
   */
  label: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * hide label - use only when label is provided in other manner
   */
  hideLabel?: boolean
  /**
   * change event handler
   */
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  /**
   * value for controlled component
   */
  value?: string
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
