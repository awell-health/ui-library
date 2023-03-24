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

export interface SelectOption {
  label: string
  value: number
}

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
  onChange: (value: number | number[]) => void
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
  options: SelectOption[]
  /**
   * Number of options to show in dropdown
   */
  optionsShown?: number
  /**
   * Value of the select (if it is controlled)
   */
  value?: Array<number>
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
  const [selected, setSelected] = useState<SelectOption[]>(
    options.filter((option) => value?.includes(option.value))
  )
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
    (event: React.MouseEvent, option: SelectOption): void => {
      if (type === 'single') {
        setSelected([option])
        onChange(option.value)
        setIsOpen(false)
      } else {
        event.stopPropagation()
        const isSelected = selected.some((item) => item.value === option.value)
        let updatedSelected: SelectOption[]

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
        const selectedValues = updatedSelected.map((item) => item.value)
        onChange(selectedValues)
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
