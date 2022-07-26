import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import classes from './inputField.module.scss'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * you can also set any attribute that is native to html button
   */
  type: 'number' | 'text' | 'date'

  /**
   * hide label - use only when label is provided in other manner
   */
  hideLabel?: boolean
  /**
   * sets label of the button
   */
  label?: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * change event handlers
   */
  onChange: ChangeEventHandler<HTMLInputElement>
  /**
   * change event handlers
   */
  onClick?: any
}

export const InputField = ({
  onChange,
  id,
  label,
  type,
  hideLabel,
  ...props
}: InputFieldProps): JSX.Element => {
  return (
    <div className={classes.awell_input_field_wrapper}>
      {!hideLabel && <label htmlFor={id}>{label}</label>}
      <input
        {...props}
        type={type}
        id={id}
        className={classes.awell_input_field}
        onChange={onChange}
      />
    </div>
  )
}
