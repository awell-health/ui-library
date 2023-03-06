import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
} from 'react'
import classes from './phoneInputField.module.scss'
import { QuestionLabel } from '../questionLabel'
import 'react-international-phone/style.css';
import {
  CountrySelector,
  usePhoneInput,
} from 'react-international-phone';
import { getDefaultCountries } from './helpers';
import { useValidate } from '../../hooks/useValidate';

export interface PhoneInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
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
  onChange: ChangeEventHandler<HTMLInputElement>
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
}

export const PhoneInputField = ({
  onChange,
  id,
  label,
  type,
  mandatory,
  value,
  ...props
}: PhoneInputFieldProps): JSX.Element => {
  const { isPossibleE164Number } = useValidate()
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      initialCountry: 'us',
      value: value,
      hideSpaceAfterDialCode: true,
      countries: getDefaultCountries(),
    });


  return (
    <div className={classes.awell_input_field_wrapper}>
      <QuestionLabel htmlFor={id} label={label} mandatory={mandatory} />
      <div className={classes.awell_phone_input_field_container}>
        <CountrySelector
          selectedCountry={country}
          onSelect={({ iso2 }) => {
            setCountry(iso2)
            onChange({ target: { value: phone } } as any)
          }}
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
          type='tel'
          id={id}
          ref={inputRef}
          className={classes.awell_input_field}
          onChange={(e) => {
            if (isPossibleE164Number(e.target.value)) {

              handlePhoneValueChange(e);
              onChange(e);
            }
          }}
          value={phone}
          data-testid={`input-${id}`}
        />
      </div>
    </div>
  )
}
