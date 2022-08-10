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
   * you can also set any attribute that is native to html button
   */
}

export const CheckboxButton = ({
  id,
  onChange,
  label,
  ...props
}: CheckboxButtonProps): JSX.Element => {
  return (
    <div className={classes.input_wrapper}>
      <div className={classes.checkbox_wrapper}>
        <input
          {...props}
          id={id}
          name="checkbox-group"
          type="checkbox"
          onChange={onChange}
        />
      </div>
      <div className={classes.label_wrapper}>
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  )
}
