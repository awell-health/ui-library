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
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  fullWidth?: boolean
  variant?: 'primary' | 'secondary' | 'tertiary'
  children: React.ReactNode | string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = forwardRef(
  (
    {
      children,
      onClick,
      fullWidth = false,
      size = 'base',
      variant = 'primary',
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        {...props}
        className={`${classes.awell_button} ${classes[`size-${size}`]} ${
          classes[variant]
        } ${fullWidth ? classes['w-full'] : ''}`}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
