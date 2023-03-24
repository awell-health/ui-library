import React, {
  InputHTMLAttributes,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import classes from './select.module.scss'
import { QuestionLabel } from '../questionLabel'
import { type Option } from './types'

export interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /**
   * you can also set any attribute that is native to html button
   */
  type: 'single' | 'multiple'
  /**
   * sets label of the button
   */
  label: string
  /**
   * sets id that is used to connect input with label
   */
  id: string
  /**
   * change event handler
   */
  onChange: (value: number | Array<Option>) => void
  /**
   * click event handler
   */
  onClick?: MouseEventHandler<HTMLInputElement>
  /**
   * Is the question required?
   */
  mandatory?: boolean
  /**
   * Options for the select
   */
  options: Array<Option>
  /**
   * Number of options to show in dropdown
   */
  optionsShown?: number
  /**
   * Value of the select (if it is controlled)
   */
  value?: Array<number> | number
}

export const Select = ({
  onChange,
  id,
  label,
  type,
  mandatory,
  options,
  optionsShown = 4,
  value,
  ...props
}: SelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  // the incoming value may be an array of numbers or a number, corresponding to an option value,
  // depending on whether the select is single or multiple type
  const getInitialValue = (): Array<Option> => {
    if (type === 'multiple') {
      return options.filter(
        (option) => (value as Array<number>)?.includes(option.value) ?? false
      )
    }
    if (type === 'single') {
      return [
        options.find((option) => (value as number) === option.value) ??
          undefined,
      ].filter((option) => option !== undefined) as Array<Option>
    }
    return []
  }

  const [selected, setSelected] = useState<Array<Option>>(getInitialValue())

  const selectWrapperRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        selectWrapperRef.current &&
        !selectWrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    },
    [selectWrapperRef]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const handleSelect = useCallback(
    (event: React.MouseEvent, option: Option): void => {
      if (type === 'single') {
        setSelected([option])
        onChange(option.value)
        setIsOpen(false)
      } else {
        event.stopPropagation()
        const isSelected = selected.some((item) => item.value === option.value)
        let updatedSelected: Option[]

        if (isSelected) {
          updatedSelected = selected
            .filter((item) => item.value !== option.value)
            .sort((a, b) => a.value - b.value)
        } else {
          updatedSelected = [...selected, option].sort(
            (a, b) => a.value - b.value
          )
        }

        setSelected(updatedSelected)
        onChange(updatedSelected)
      }
    },
    [selected, type, onChange]
  )

  const displayValue = selected.map((item) => item.label).join(', ')

  return (
    <div className={classes.select_wrapper} ref={selectWrapperRef}>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <div className={classes.select} onClick={toggleDropdown}>
        <input
          {...props}
          type="text"
          id={id}
          value={displayValue}
          readOnly
          className={classes.select_input}
          data-testid={`input-${id}`}
        />
        <div
          className={`${isOpen ? classes.dropdown_open : classes.dropdown} ${
            options.length > optionsShown ? classes.dropdown_scroll : ''
          }`}
          style={{ maxHeight: `${optionsShown * 50}px` }}
        >
          <div className={classes.more_indicator} />
          {options.map((option) => (
            <div
              key={option.value}
              className={classes.option}
              onClick={(event) => handleSelect(event, option)}
            >
              {type === 'multiple' && (
                <div className={classes.checkbox}>
                  <input
                    type="checkbox"
                    id={`checkbox-${option.value}`}
                    className={classes.checkbox_input}
                    checked={selected.some(
                      (item) => item.value === option.value
                    )}
                  />
                  <label htmlFor={`checkbox-${option.value}`} />
                </div>
              )}
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
