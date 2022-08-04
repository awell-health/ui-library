import React from 'react'
import classes from './spinner.module.scss'

export const CircularSpinner = (): JSX.Element => {
  return (
    <div className={classes.awell_circular_spinner}>
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
