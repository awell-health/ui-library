import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import classes from './rangeInput.module.scss'
import { QuestionLabel } from '../questionLabel'
import { isEmpty, noop } from 'lodash'

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
  /**
   * Function to reflect the touched state
   */
  onTouched?: (touched: boolean) => void
  /**
   * Touch tooltip label
   */
  touchTooltipLabel?: string
}

export const RangeInput = ({
  label,
  onChange,
  id,
  sliderConfig,
  mandatory,
  touchTooltipLabel,
  onTouched = noop,
  ...props
}: RangeInputProps): JSX.Element => {
  const {
    display_marks,
    is_value_tooltip_on,
    max,
    max_label,
    min,
    min_label,
    show_min_max_values,
    step_value,
  } = sliderConfig
  const style = {
    '--awell-step': step_value,
    '--awell-min': min,
    '--awell-max': max,
    '--awell-min-max-value': show_min_max_values ? 'counter(x)' : '',
    '--awell-thick-color': display_marks
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
        id="awell__slider_tooltip"
        className={classes.tooltip}
        style={{ left, top, display: touched ? 'block' : 'none' }}
      >
        {value}
      </div>
    )
  }

  const renderTouchTooltip = (): JSX.Element | null => {
    if (touched) {
      return null
    }
    return (
      <div id="awell__slider_touch_tooltip" className={classes.tooltip_touched}>
        {touchTooltipLabel ?? 'Touch to select a value'}
      </div>
    )
  }

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTouched(true)
    onTouched(true)
    setInternalValue(event.target.value)
    onChange(event)
  }

  React.useEffect(() => {
    const MIDPOINT_PERCENTAGE = 0.5 // 50%
    const THUMB_WIDTH = 16 // px
    const TOP_POSITION_ADJUSTMENT = -30 // px
    if (touched === true && is_value_tooltip_on && tooltipRef.current) {
      const input = tooltipRef.current.closest(
        `.${classes.awell_range_input_wrapper}`
      ) as HTMLElement
      if (input) {
        const inputWidth = input.clientWidth
        const range = max - min
        const percentage = (parseInt(internalValue) - min) / range
        const thumbPosition =
          (isNaN(percentage) ? MIDPOINT_PERCENTAGE : percentage) *
          (inputWidth - THUMB_WIDTH)
        const tooltipLeft = thumbPosition + THUMB_WIDTH / 2
        const tooltipTop = TOP_POSITION_ADJUSTMENT
        setTooltipPosition({
          left: tooltipLeft,
          top: tooltipTop,
        })
      }
    }
  }, [internalValue, is_value_tooltip_on, max, min, touched])

  return (
    <div>
      <QuestionLabel
        htmlFor={id}
        label={label}
        mandatory={mandatory}
        id={`${id}-label`}
      />
      <div className={classes.input_container}>
        <div
          className={`${classes.touch_tooltip_wrapper}  ${
            is_value_tooltip_on ? classes.with_value_tooltip : ''
          }`}
        >
          {renderTouchTooltip()}
        </div>
        <div
          className={`${classes.awell_range_input_wrapper} ${
            display_marks ? classes.with_marks : ''
          }`}
          style={style}
        >
          {is_value_tooltip_on &&
            renderValueTooltip(
              internalValue,
              tooltipPosition.left,
              tooltipPosition.top,
              touched
            )}
          <input
            {...props}
            data-testid={id}
            type="range"
            id="awell__slider_input"
            min={min}
            max={max}
            step={step_value}
            className={`${classes.awell_range_input} ${
              touched ? classes.showThumb : classes.hideThumb
            }`}
            onChange={handleValueChange}
            onFocus={() => {
              setTouched(true)
              onTouched(true)
            }}
            value={internalValue}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={(props.value || min) as number}
            aria-labelledby={`${id}-label`}
          />
        </div>
        <div className={classes.min_max_wrapper}>
          {show_min_max_values && (
            <div
              className={classes.min_max_data_list}
              data-testid={`${id}-datalist-values`}
            >
              <div className={classes.min} aria-label="Minimum value">
                {min}
              </div>
              <div className={classes.max} aria-label="Maximum value">
                {max}
              </div>
            </div>
          )}
          {(!isEmpty(min_label) || !isEmpty(max_label)) && (
            <div
              className={classes.min_max_data_list}
              data-testid={`${id}-datalist-labels`}
            >
              <div className={classes.min} aria-label="Minimum label">
                {min_label}
              </div>
              <div className={classes.max} aria-label="Maximum label">
                {max_label}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
