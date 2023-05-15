import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import classes from './rangeInput.module.scss'
import { QuestionLabel } from '../questionLabel'

export interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Question label
   */
  label: string
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
  /**
   * change event handlers
   */
  onChange: ChangeEventHandler<HTMLInputElement>
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * Is the question required?
   */
  mandatory?: boolean
}

export const RangeInput = ({
  label,
  onChange,
  id,
  sliderConfig,
  mandatory,
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

  const [internalValue, setInternalValue] = React.useState<string>('-')
  const [tooltipPosition, setTooltipPosition] = React.useState({
    left: 0,
    top: 0,
  })
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const renderValueTooltip = (
    value: string,
    left: number,
    top: number
  ): JSX.Element | null => {
    return (
      <div ref={tooltipRef} className={classes.tooltip} style={{ left, top }}>
        {value}
      </div>
    )
  }

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInternalValue(event.target.value)
    onChange(event)
  }

  React.useEffect(() => {
    const MIDPOINT_PERECENTAGE = 0.5 // 50%
    const THUMB_WIDTH = 16 // px
    const TOP_POSITION_ADJUSTMENT = 82 // px
    if (sliderConfig.is_value_tooltip_on && tooltipRef.current) {
      const input = tooltipRef.current.closest(
        `.${classes.awell_range_input_wrapper}`
      ) as HTMLElement
      if (input) {
        const inputWidth = input.clientWidth
        const range = sliderConfig.max - sliderConfig.min
        const percentage = (parseInt(internalValue) - sliderConfig.min) / range
        const thumbPosition =
          (isNaN(percentage) ? MIDPOINT_PERECENTAGE : percentage) *
          (inputWidth - THUMB_WIDTH)
        const tooltipLeft = input.offsetLeft + thumbPosition - THUMB_WIDTH / 2
        setTooltipPosition({
          left: tooltipLeft,
          top: input.offsetTop - TOP_POSITION_ADJUSTMENT,
        })
      }
    }
  }, [
    internalValue,
    sliderConfig.is_value_tooltip_on,
    sliderConfig.max,
    sliderConfig.min,
  ])

  return (
    <div>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <div className={classes.awell_range_input_wrapper} style={style}>
        <input
          {...props}
          data-testid={id}
          type="range"
          list={`${id}-min-max-labels`}
          id={id}
          min={sliderConfig.min}
          max={sliderConfig.max}
          step={sliderConfig.step_value}
          className={classes.awell_range_input}
          onChange={handleValueChange}
        />
        <datalist
          style={{
            marginTop: sliderConfig.show_min_max_values ? '36px' : '0px',
          }}
          className={classes.awell_range_input_datalist}
          data-testid={`${id}-datalist`}
          id={`${id}-min-max-labels`}
        >
          <option
            value={sliderConfig.min}
            label={sliderConfig.min_label}
          ></option>
          <option
            value={sliderConfig.max}
            label={sliderConfig.max_label}
          ></option>
        </datalist>
        {sliderConfig.is_value_tooltip_on &&
          renderValueTooltip(
            internalValue,
            tooltipPosition.left,
            tooltipPosition.top
          )}
      </div>
    </div>
  )
}
