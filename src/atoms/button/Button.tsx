import React, { ForwardedRef, forwardRef,MouseEventHandler, ButtonHTMLAttributes, } from 'react';
// @ts-ignore
import classes from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>;
  /**
   * sets style of the button
   */
  variant?:'primary' | 'secondary' | 'counter' | 'text' | 'tertiary'
  /**
   * you can also set any attribute that is native to html button
   */
};

export const Button = forwardRef(({ children, onClick, variant = 'primary', ...props }: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button {...props} className={`${classes.awell_button} ${classes[variant]}`} onClick={onClick} ref={ref}>
      {children}
    </button>
  );
})
