import React, {
  InputHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react'
import classes from './phoneInputField.module.scss'
import { QuestionLabel } from '../questionLabel'
import 'react-international-phone/style.css'
import {
  CountrySelector,
  usePhoneInput,
  CountryIso2,
} from 'react-international-phone'
import { getDefaultCountries } from './helpers'
import { ParsedCountry } from '../../hooks/useValidate'

export interface PhoneInputFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
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
  onChange: ({
    target: { value },
  }: {
    target: { value: string | undefined }
  }) => void
  /**
   * click event handler
   */
  onClick?: MouseEventHandler<HTMLInputElement>
  /**
   * Is the question required?
   */
  mandatory?: boolean

  /**
   * The value of the input
   */
  value: string

  /**
   * The initial country shown on input load
   */
  initialCountry?: CountryIso2

  /**
   * The list of available countries to choose from
   */
  availableCountries?: Array<CountryIso2>

  /**
   * Placeholder phone number
   */
  placeholder?: string

  /**
   * Does not allow for the country code to be deleted
   */
  forceDialCode?: boolean
}

export const PhoneInputField = ({
  onChange,
  id,
  label,
  mandatory,
  value,
  placeholder,
  initialCountry = 'us',
  availableCountries,
  forceDialCode = false,
  ...props
}: PhoneInputFieldProps): JSX.Element => {
  const [touched, setTouched] = useState(false)
  const countries = getDefaultCountries(availableCountries, initialCountry)
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      initialCountry,
      value,
      hideSpaceAfterDialCode: true,
      countries,
      forceDialCode,
      onPhoneUpdate: (phone) => {
        // Only send value to backend if user has touched the field and value is more than country code
        // The country code length is typically 1-3 digits, so we check if phone is longer than that
        if (touched && phone.length > 3) {
          onChange({ target: { value: phone } })
        } else {
          // Send undefined when field hasn't been touched or when user deletes back to just country code
          onChange({ target: { value: undefined } })
        }
      },
    })

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!touched) {
      setTouched(true)
    }
    handlePhoneValueChange(e)
  }

  const handleCountrySelect: (country: ParsedCountry) => void = ({ iso2 }) => {
    setCountry(iso2)
  }

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const phoneNumber = e.clipboardData.getData('text') ?? ''

    // if number contains + (country code), remove it from input, before pasting new value
    if (phoneNumber.includes('+')) {
      if (inputRef.current) {
        inputRef.current.value = ''
        inputRef.current.dispatchEvent(new Event('change'))
      }
    }
  }

  return (
    <div className={classes.awell_input_field_wrapper}>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <div className={classes.awell_phone_input_field_container}>
        <CountrySelector
          countries={countries}
          selectedCountry={country}
          onSelect={handleCountrySelect}
          buttonStyle={{
            // to match awell input field style
            border: 0,
            height: 42,
            marginRight: 2,
            backgroundColor: 'transparent',
          }}
        />
        <input
          {...props}
          type="tel"
          id={id}
          ref={inputRef}
          className={classes.awell_input_field}
          placeholder={placeholder}
          onChange={handleInputChange}
          data-1p-ignore
          value={phone}
          data-testid={`input-${id}`}
          dir="ltr"
          onPaste={onPaste}
        />
      </div>
    </div>
  )
}

PhoneInputField.displayName = 'PhoneInputField'
