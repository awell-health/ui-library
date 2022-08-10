import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
} from 'react'
import classes from './inputField.module.scss'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { QuestionLabel } from '../questionLabel'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * you can also set any attribute that is native to html button
   */
  type: 'number' | 'text' | 'date'
  /**
   * sets label of the button
   */
  label: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * change event handler
   */
  onChange: ChangeEventHandler<HTMLInputElement>
  /**
   * click event handler
   */
  onClick?: MouseEventHandler<HTMLInputElement>
  /**
   * Does the input has any errors?
   */
  error?: string
  /**
   * Is the question required?
   */
  mandatory?: boolean
}

export const InputField = ({
  onChange,
  id,
  label,
  type,
  error,
  mandatory,
  ...props
}: InputFieldProps): JSX.Element => {
  return (
    <div className={classes.awell_input_field_wrapper}>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <div
        className={`${classes.input_wrapper_with_error} ${
          error ? classes.has_error : ''
        }`}
      >
        <input
          {...props}
          type={type}
          id={id}
          className={classes.awell_input_field}
          onChange={onChange}
        />
        {error && (
          <div className={classes.error_icon}>
            <ExclamationCircleIcon aria-hidden="true" />
          </div>
        )}
      </div>
      {error && <p className={classes.error_message}>{error}</p>}
    </div>
  )
}
