import React from 'react'
import classes from './spinner.module.scss'
interface CircularSpinnerProps {
  size?: 'sm' | 'base'
}

export const CircularSpinner = ({size = 'base'}: CircularSpinnerProps): JSX.Element => {
  return (
    <div className={`${classes.awell_circular_spinner} ${classes[`size-${size}`]}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
export const HorizontalSpinner = (): JSX.Element => {
  return (
    <div className={classes.awell_horizontal_spinner}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
