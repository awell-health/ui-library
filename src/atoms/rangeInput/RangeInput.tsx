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
    position: 'relative',
  } as React.CSSProperties

  const hasInitialValue = props.value !== undefined

  const [internalValue, setInternalValue] = React.useState<string>(
    hasInitialValue ? (props.value as string) : ''
  )
  const [touched, setTouched] = React.useState<boolean>(hasInitialValue)
  const [tooltipPosition, setTooltipPosition] = React.useState({
    left: 0,
    top: 0,
  })
  const tooltipRef = React.useRef<HTMLDivElement>(null)

  const renderValueTooltip = (
    value: string,
    left: number,
    top: number,
    touched = false
  ): JSX.Element | null => {
    return (
      <div
        ref={tooltipRef}
        id="tooltip"
        className={classes.tooltip}
        style={{ left, top, display: touched ? 'block' : 'none' }}
      >
        {value}
      </div>
    )
  }

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTouched(true)
    setInternalValue(event.target.value)
    onChange(event)
  }

  React.useEffect(() => {
    const MIDPOINT_PERECENTAGE = 0.5 // 50%
    const THUMB_WIDTH = 16 // px
    const TOP_POSITION_ADJUSTMENT = -28 // px
    if (
      touched === true &&
      sliderConfig.is_value_tooltip_on &&
      tooltipRef.current
    ) {
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
        const tooltipLeft = thumbPosition + THUMB_WIDTH / 2
        const tooltipTop = TOP_POSITION_ADJUSTMENT
        setTooltipPosition({
          left: tooltipLeft,
          top: tooltipTop,
        })
      }
    }
  }, [
    internalValue,
    sliderConfig.is_value_tooltip_on,
    sliderConfig.max,
    sliderConfig.min,
    touched,
  ])

  return (
    <div>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <div
        className={`${classes.awell_range_input_wrapper} ${
          sliderConfig.display_marks ? classes.with_marks : ''
        } ${sliderConfig.is_value_tooltip_on ? classes.with_tooltip : ''}`}
        style={style}
      >
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
          onFocus={() => setTouched(true)}
        />
        <datalist
          className={`${classes.awell_range_input_datalist} ${
            sliderConfig.show_min_max_values ? classes.with_min_max_labels : ''
          }`}
          data-testid={`${id}-datalist`}
          id={`${id}-min-max-labels`}
        >
          <option value={sliderConfig.min} label={sliderConfig.min_label} />
          <option value={sliderConfig.max} label={sliderConfig.max_label} />
        </datalist>
        {sliderConfig.is_value_tooltip_on &&
          renderValueTooltip(
            internalValue,
            tooltipPosition.left,
            tooltipPosition.top,
            touched
          )}
      </div>
    </div>
  )
}
