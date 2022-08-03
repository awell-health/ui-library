import React from 'react'
import classes from './label.module.scss'
import { InlineText } from '../typography'

export interface LabelProps {
  /**
   * connects label with input element
   */
  htmlFor: string
  /**
   * sets input label
   */
  label: string
  className?: string
  mandatory?: boolean
}

export const Label = ({
  htmlFor,
  label,
  mandatory,
}: LabelProps): JSX.Element => {
  return (
    <label htmlFor={htmlFor} className={classes.awell_label}>
      <InlineText variant="smallHeadline">{label}</InlineText>
      {mandatory && <span className={classes.mandatory}>*</span>}
    </label>
  )
}
