import React, {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
} from 'react'
// @ts-ignore
import classes from './rangeInput.module.scss'
import { Text } from '../typography'

export interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * change event handlers
   */
  onChange: ChangeEventHandler<HTMLInputElement>
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * slider config
   */
  sliderConfig: {
    min: number
    max: number
    step_value: number
    display_marks: boolean
    min_label: string
    max_label: string
    is_value_tooltip_on: boolean
    show_min_max_values: boolean
  }
}

export const RangeInput = ({
  onChange,
  id,
  sliderConfig,
  ...props
}: RangeInputProps): JSX.Element => {
  const style = {
    '--awell-step': sliderConfig.step_value,
    '--awell-min': sliderConfig.min,
    '--awell-max': sliderConfig.max,
    '--awell-min-max-value': sliderConfig.show_min_max_values
      ? 'counter(x)'
      : '',
    '--awell-thick-color': sliderConfig.display_marks
      ? 'var(--awell-neutralLight50)'
      : 'transparent',
  } as React.CSSProperties

  return (
    <div className={classes.awell_range_input_wrapper} style={style}>
      <input
        {...props}
        type="range"
        id={id}
        min={sliderConfig.min}
        max={sliderConfig.max}
        step={sliderConfig.step_value}
        className={classes.awell_range_input}
        onChange={onChange}
      />
    </div>
  )
}
