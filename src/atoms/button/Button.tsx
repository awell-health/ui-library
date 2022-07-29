import React, {
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  ButtonHTMLAttributes,
} from 'react'
import classes from './button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * sets style of the button
   */
  variant?: 'primary' | 'secondary' | 'counter' | 'text' | 'tertiary'
  children: React.ReactNode | string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = forwardRef(
  (
    { children, onClick, variant = 'primary', ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        {...props}
        className={`${classes.awell_button} ${classes[variant]}`}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
