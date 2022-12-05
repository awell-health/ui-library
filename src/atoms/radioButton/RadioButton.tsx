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
   * sets name for radio group
   */
  name: string
  /**
   * you can also set any attribute that is native to html radio input
   */
}

export const RadioButton = ({
  onChange,
  label,
  name,
  ...props
}: RadioButtonProps): JSX.Element => {
  return (
    <div className={classes.input_wrapper}>
      <div className={classes.radio_wrapper}>
        <input {...props} name={name} type="radio" onChange={onChange} />
      </div>
      <div className={classes.label_wrapper}>
        <label htmlFor={props.id}>{label}</label>
      </div>
    </div>
  )
}
