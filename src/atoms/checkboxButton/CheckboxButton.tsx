import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import classes from './checkboxButton.module.scss'

export interface CheckboxButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * sets label of the button
   */
  label: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * change event handlers
   */
  onChange: ChangeEventHandler<HTMLInputElement>
  /**
   * sets name for checkbox group
   */
  name: string
  /**
   * you can also set any attribute that is native to html button
   */
}

export const CheckboxButton = ({
  onChange,
  label,
  name,
  ...props
}: CheckboxButtonProps): JSX.Element => {
  return (
    <div className={classes.input_wrapper}>
      <div className={classes.checkbox_wrapper}>
        <input {...props} name={name} type="checkbox" onChange={onChange} />
      </div>
      <div className={classes.label_wrapper}>
        <label htmlFor={props.id} id="awell__question_checkbox">
          {label}
        </label>
      </div>
    </div>
  )
}
