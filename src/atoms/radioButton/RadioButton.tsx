import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import classes from './radioButton.module.scss'

export interface RadioButtonProps
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

export const RadioButton = ({
  onChange,
  label,
  ...props
}: RadioButtonProps): JSX.Element => {
  return (
    <div className={classes.input_wrapper}>
      <div className={classes.radio_wrapper}>
        <input {...props} name="radio-group" type="radio" onChange={onChange} />
      </div>
      <div className={classes.label_wrapper}>
        <label htmlFor={props?.id}>{label}</label>
      </div>
    </div>
  )
}
