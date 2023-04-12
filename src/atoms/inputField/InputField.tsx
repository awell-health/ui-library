import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
} from 'react'
import classes from './inputField.module.scss'
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
   * Is the question required?
   */
  mandatory?: boolean
}

export const InputField = ({
  onChange,
  id,
  label,
  type,
  mandatory,
  ...props
}: InputFieldProps): JSX.Element => {
  return (
    <div className={classes.awell_input_field_wrapper}>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <input
        {...props}
        type={type}
        id={id}
        className={classes.awell_input_field}
        onChange={onChange}
        data-testid={`input-${id}`}
        dir="ltr"
      />
    </div>
  )
}
