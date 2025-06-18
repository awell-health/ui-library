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
import { isEmpty, isNil, noop } from 'lodash'
import { FixedSizeList as List } from 'react-window'

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
  onChange: (value: number | Array<Option> | string) => void
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
  value: Array<Option> | number | string | undefined
  /**
   * Labels for the select
   */
  labels: {
    questionLabel?: string
    placeholder?: string
    noOptions?: string
    customError?: string
    loading?: string
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

  /**
   * Callback function to handle search
   */
  onSearch?: (searchValue: string) => void

  /**
   * Are options for the select loading?
   */
  loading?: boolean

  /**
   * Allow searching after an option has been selected (for specific use cases)
   */
  allowSearchAfterSelect?: boolean

  /**
   * Allow having 0 options in the list
   */
  allowEmptyOptionsList?: boolean

  searchValue?: string
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
  onSearch,
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
  loading = false,
  searchValue: propSearchValue,
  allowEmptyOptionsList = false,
  allowSearchAfterSelect = false,
  ...props
}: SelectProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<Array<Option>>(options)
  const [searchValue, setSearchValue] = useState<string | undefined>(
    propSearchValue
  )

  useEffect(() => {
    if (propSearchValue !== undefined) {
      setSearchValue(propSearchValue)
    }
  }, [propSearchValue])

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
      const matchingOption = [
        options.find((option) => value === option.value) ?? undefined,
      ].filter((option) => option !== undefined) as Array<Option>
      return matchingOption
    }
    return []
  }

  const [selected, setSelected] = useState<Array<Option>>(getInitialValue())
  const selectWrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value

    if (searchValue === inputText) {
      return // Do nothing if the input hasn't changed
    }

    setSearchValue(inputText)

    if (!isNil(onSearch)) {
      onSearch(inputText)
      setIsOpen(true)
      inputRef.current?.focus()
      return
    }

    const updatedFilteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputText.toLowerCase())
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

  useEffect(() => {
    if (
      !isNil(onSearch) &&
      allowSearchAfterSelect &&
      searchValue === selected[0]?.label
    ) {
      // no need to open the dropdown in this case as search exactly matches the label of the first selected option
      setIsOpen(false)
      return
    }
    if (!isNil(onSearch) && options.length > 0) {
      setIsOpen(true)
      setFilteredOptions(options)
    }
    if (allowEmptyOptionsList && options.length === 0) {
      setFilteredOptions(options)
    }
  }, [options])

  useEffect(() => {
    /*
     * When the form is refreshed, we want to set the searchValue to the label of the first selected option
     * This is to ensure that the searchValue is set to the label of the first selected option
     */
    if (allowSearchAfterSelect && selected.length > 0 && isEmpty(searchValue)) {
      setSearchValue(selected[0]?.label ?? '')
    }
  }, [selected, allowSearchAfterSelect, searchValue])

  useEffect(() => {
    if (isOpen) {
      const container = document.getElementById(
        'ahp_main_content_with_scroll_hint'
      )
      if (container && selectWrapperRef.current) {
        const dropdownElement = selectWrapperRef.current.querySelector(
          `.${classes.dropdown_open}`
        ) as HTMLElement
        if (dropdownElement) {
          const containerRect = container.getBoundingClientRect()
          const dropdownRect = dropdownElement.getBoundingClientRect()
          const selectRect = selectWrapperRef.current.getBoundingClientRect()

          // Check if dropdown would be cut off at the bottom
          const dropdownBottom = selectRect.bottom + dropdownRect.height
          const containerBottom = containerRect.bottom

          if (dropdownBottom > containerBottom) {
            // Calculate how much to scroll to show the dropdown
            const scrollAmount = dropdownBottom - containerBottom + 20 // Add some padding
            container.scrollTo({
              top: container.scrollTop + scrollAmount,
              behavior: 'smooth',
            })
          }
        }
      }
    }
  }, [isOpen])

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const handleSelect = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent, option: Option): void => {
      if (type === 'single') {
        setSelected([option])
        onChange(option.value)
        setIsOpen(false)
        if (allowSearchAfterSelect) {
          setSearchValue(option.label)
        }
      } else {
        event.stopPropagation()
        const isSelected = selected.some((item) => item.value === option.value)
        let updatedSelected: Option[]

        if (isSelected) {
          updatedSelected = selected
            .filter((item) => item.value !== option.value)
            .sort()
        } else {
          updatedSelected = [...selected, option].sort()
        }

        setSelected(updatedSelected)
        onChange(updatedSelected)

        if (allowSearchAfterSelect) {
          setSearchValue('') // Clear searchValue or set to desired value
        }
      }
    },
    [selected, type, onChange, allowSearchAfterSelect]
  )

  const rowRenderer = ({
    index,
    style,
  }: {
    index: number
    style: React.CSSProperties
  }) => {
    const option = filteredOptions[index]
    return (
      <div
        key={option.id ?? option.value}
        className={classes.option}
        id={`option-${option.value}`}
        style={style}
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
              checked={selected?.some((item) => item.value === option.value)}
              readOnly
              tabIndex={-1}
            />
          </div>
        )}
      </div>
    )
  }

  const getDisplayValue = (): string => {
    if (filtering) {
      if (allowSearchAfterSelect) {
        if (isEmpty(searchValue) && selected.length > 0) {
          return selected[0]?.label ?? ''
        }
        return searchValue ?? ''
      } else if (selected.length === 0) {
        return searchValue ?? ''
      } else if (type === 'single') {
        return selected[0]?.label ?? ''
      } else if (type === 'multiple') {
        return selected.length > 0
          ? selected
              .map((option) => truncateLabel(option.label, displayMaxLength))
              .join(', ')
          : ''
      }
    } else if (type === 'single') {
      return selected[0]?.label ?? ''
    } else if (type === 'multiple') {
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
        if (index > 0) {
          const previousOption = filteredOptions[index - 1]
          const previousOptionElement = document.getElementById(
            `option-${previousOption.value}`
          )

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

  const getPlaceholder = (loading: boolean): string => {
    if (loading) {
      return labels?.loading ?? 'Loading...'
    }
    return labels?.placeholder ?? 'Type to search or click to see options...'
  }

  return (
    <div className={classes.select_wrapper} ref={selectWrapperRef}>
      {!isNil(labels?.questionLabel) && (
        <QuestionLabel
          htmlFor={id}
          label={labels.questionLabel}
          mandatory={mandatory}
        />
      )}
      <div className={classes.select_input_wrapper} onClick={toggleDropdown}>
        <input
          {...props}
          ref={inputRef}
          type="text"
          id={id}
          value={getDisplayValue()}
          placeholder={getPlaceholder(loading)}
          disabled={loading && filteredOptions.length === 0}
          className={`${classes.select_input} ${
            filtering ? '' : classes.pointer
          }`}
          data-testid={`input-${id}`}
          onChange={filtering ? handleInputChange : noop}
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
          role="listbox"
        >
          {filteredOptions.length === 0 ? (
            <div className={classes.no_options}>
              {isNil(searchValue) || searchValue.length === 0
                ? labels.placeholder
                : labels.noOptions}
            </div>
          ) : (
            <List
              height={Math.min(filteredOptions.length, 5) * 36}
              itemCount={filteredOptions.length}
              itemSize={36}
              width="100%"
            >
              {rowRenderer}
            </List>
          )}
        </div>
      </div>
      {labels?.customError && (
        <div className={classes.error}>{labels.customError}</div>
      )}
    </div>
  )
}
