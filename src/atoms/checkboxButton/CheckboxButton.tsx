import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import classes from './checkboxButton.module.scss'

export interface CheckboxButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * change event handlers
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
}

export const CheckboxButton = ({
  onChange,
  id,
  label,
  ...props
}: CheckboxButtonProps): JSX.Element => {
  return (
    <label className={classes.awell_checkbox_label}>
      <input
        {...props}
        type="checkbox"
        name="radio-group"
        className={classes.awell_checkbox_button}
        onChange={onChange}
      />
      {label}
    </label>
  )
}
