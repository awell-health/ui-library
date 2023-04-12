/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  value: Array<Option> | number | undefined
  /**
   * Labels for the select
   */
  labels: {
    questionLabel?: string
    searchPlaceholder?: string
    noOptions?: string
    customError?: string
  }
  /**
   * Show the number of selected options in the select as a badge (only for 'multiple' type select)
   */
  showCount?: boolean
  /**
   * Max length of the label to be displayed in the select (only for 'multiple' type select)
   */
  displayMaxLength?: number | null

  /**
   * Enable filtering of options in the dropdown (e.g. autocomplete behaviour)
   */
  filtering?: boolean
}

const truncateLabel = (label: string, maxLength: number | null = 15) => {
  if (maxLength === null) {
    return label
  }

  if (label.length > maxLength) {
    return `${label.slice(0, maxLength)}...`
  }
  return label
}

export const Select = ({
  onChange,
  id,
  labels,
  type,
  mandatory,
  options,
  optionsShown = 4,
  showCount = false,
  displayMaxLength = 15,
  value,
  filtering = false,
  ...props
}: SelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<Array<Option>>(options)
  const [searchValue, setSearchValue] = useState('')

  // the incoming value may be an array of numbers or a number, corresponding to an option value,
  // depending on whether the select is single or multiple type
  const getInitialValue = (): Array<Option> => {
    if (value === undefined) {
      return []
    }
    if (type === 'multiple') {
      return value as Array<Option>
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value.toLowerCase()
    if (inputText === '') {
      setSearchValue('')
      setFilteredOptions(options)
      return
    }
    setSearchValue(inputText)
    const updatedFilteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputText)
    )
    setFilteredOptions(updatedFilteredOptions)
  }

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
    (event: React.MouseEvent | React.KeyboardEvent, option: Option): void => {
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

  const getDisplayValue = (): string => {
    if (isOpen) {
      return searchValue
    }

    if (type === 'single') {
      return selected[0]?.label ?? ''
    }

    if (type === 'multiple') {
      return selected.length > 0
        ? selected
            .map((option) => truncateLabel(option.label, displayMaxLength))
            .join(', ')
        : ''
    }

    return ''
  }

  const handleKeyDownOnOption = useCallback(
    (event: React.KeyboardEvent, option: Option) => {
      if (event.code === 'Space') {
        event.preventDefault()
        handleSelect(event, option)
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const index = filteredOptions.findIndex(
          (item) => item.value === option.value
        )
        console.log({ index })
        if (index > 0) {
          const previousOption = filteredOptions[index - 1]
          const previousOptionElement = document.getElementById(
            `option-${previousOption.value}`
          )
          console.log({ previousOptionElement })

          if (previousOptionElement) {
            previousOptionElement.focus()
          }
        }
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const index = filteredOptions.findIndex(
          (item) => item.value === option.value
        )
        if (index < filteredOptions.length - 1) {
          const nextOption = filteredOptions[index + 1]
          const nextOptionElement = document.getElementById(
            `option-${nextOption.value}`
          )
          if (nextOptionElement) {
            nextOptionElement.focus()
          }
        }
      }
    },
    [filteredOptions, handleSelect]
  )

  const handleKeyUpOnOption = useCallback(
    (event: React.KeyboardEvent, option: Option) => {
      if (event.key === 'Enter') {
        handleSelect(event, option)
      }
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    },
    [handleSelect]
  )

  const handleKeyUpOnInput = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        toggleDropdown()
      }
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    },
    [toggleDropdown]
  )

  const handleResetSearch = useCallback(() => {
    setSearchValue('')
    setFilteredOptions(options)
  }, [options])

  return (
    <div className={classes.select_wrapper} ref={selectWrapperRef}>
      {labels?.questionLabel !== undefined && (
        <QuestionLabel
          htmlFor={id}
          label={labels.questionLabel}
          mandatory={mandatory}
        />
      )}
      <div className={classes.select_input_wrapper} onClick={toggleDropdown}>
        <input
          {...props}
          type="text"
          id={id}
          value={getDisplayValue()}
          placeholder={filtering ? labels?.searchPlaceholder ?? '' : ''}
          className={`${classes.select_input} ${
            filtering ? '' : classes.pointer
          }`}
          data-testid={`input-${id}`}
          onChange={filtering ? handleInputChange : () => null}
          onClick={filtering ? handleResetSearch : () => null}
          readOnly={!filtering}
          onKeyUp={handleKeyUpOnInput}
          dir="ltr"
        />
        {type === 'multiple' && selected.length > 0 && showCount && (
          <div className={classes.badge}>{selected.length}</div>
        )}
        <div
          className={`${classes.chevron} ${isOpen ? `${classes.open}` : ''}`}
        />
        <div
          className={`${isOpen ? classes.dropdown_open : classes.dropdown} ${
            options.length > optionsShown ? classes.dropdown_scroll : ''
          }`}
          style={{ maxHeight: `${optionsShown * 50}px` }}
          role="listbox"
        >
          {filteredOptions.length === 0 && (
            <div className={classes.no_options}>No options found</div>
          )}
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={classes.option}
              id={`option-${option.value}`}
              onClick={(event) => handleSelect(event, option)}
              onKeyUp={(e) => handleKeyUpOnOption(e, option)}
              onKeyDown={(e) => handleKeyDownOnOption(e, option)}
              role="button"
              tabIndex={0}
            >
              {option.label}
              {type === 'multiple' && (
                <div className={classes.checkbox}>
                  <input
                    type="checkbox"
                    id={`checkbox-${option.value}`}
                    checked={selected?.some(
                      (item) => item.value === option.value
                    )}
                    readOnly
                    tabIndex={-1}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {labels?.customError && (
        <div className={classes.error}>{labels.customError}</div>
      )}
    </div>
  )
}
