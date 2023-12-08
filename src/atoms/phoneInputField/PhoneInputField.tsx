import React, { InputHTMLAttributes, MouseEventHandler } from 'react'
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
  onChange: ({ target: { value } }: { target: { value: string } }) => void
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
  ...props
}: PhoneInputFieldProps): JSX.Element => {
  const countries = getDefaultCountries(availableCountries)
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      initialCountry,
      value,
      hideSpaceAfterDialCode: true,
      countries,
    })

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handlePhoneValueChange(e)
    onChange(e)
  }

  const handleCountrySelect: (country: ParsedCountry) => void = ({ iso2 }) => {
    setCountry(iso2)
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
        />
      </div>
    </div>
  )
}

PhoneInputField.displayName = 'PhoneInputField'
