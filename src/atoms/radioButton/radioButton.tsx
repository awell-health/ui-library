import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
// @ts-ignore
import classes from './radioButton.module.scss';

export interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * change event handles
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
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

export const RadioButton = ({ onChange, id, label, ...props }: RadioButtonProps):JSX.Element => {
  return (
      <>
        <input {...props} type="radio" id={id} name="radio-group" className={classes.awell_radio_button} onChange={onChange}/>
        <label htmlFor={id}>{label}</label>
      </>

  );
}