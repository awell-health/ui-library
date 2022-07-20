import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
// @ts-ignore
import classes from './inputField.module.scss'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * change event handles
   */
  onChange: ChangeEventHandler<HTMLInputElement>
  /**
   * sets label of the button
   */
  label: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * you can also set any attribute that is native to html button
   */
  type: 'number' | 'input'
}

export const InputField = ({
  onChange,
  id,
  label,
  type,
  ...props
}: InputFieldProps): JSX.Element => {
  return (
    <div className={classes.awell_input_field_wrapper}>
      <label htmlFor={id}>{label}</label>
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
