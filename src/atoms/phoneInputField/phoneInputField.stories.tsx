import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  PhoneInputField as PhoneInputFieldComponent,
  PhoneInputFieldProps,
} from './PhoneInputField'
import { useValidate } from '../../hooks/useValidate'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Input Field',
  component: PhoneInputFieldComponent,
  argTypes: {
    value: {
      control: 'text',
      defaultValue: '+14018631000',
      type: { name: 'string', required: false },
    },
    label: {
      control: 'text',
      defaultValue: 'Phone Number',
    },
    id: {
      control: 'text',
      defaultValue: 'input-field-story-id',
    },
    mandatory: {
      control: 'boolean',
      defaultValue: false,
    },
    onChange: { action: 'change' },
    onClick: { action: 'click' },
    initialCountry: {
      control: 'text',
      defaultValue: 'us',
      type: { name: 'string', required: false },
    },
    availableCountries: {
      control: 'array',
      defaultValue: [
        'gb',
        'us',
        'fr',
        'de',
        'es',
        'it',
        'nl',
        'be',
        'ca',
        'au',
        'nz',
      ],
    },
  },
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        <ThemeProvider accentColor="#004ac2">
          <StoryComponent />
        </ThemeProvider>
      </div>
    ),
  ],
} as Meta

export const PhoneInputField: Story<PhoneInputFieldProps> = ({
  label,
  id,
  onChange,
  mandatory,
  value,
}) => {
  const { isPossibleE164Number, validatePhoneNumber, isValidE164Number } =
    useValidate()
  const [phoneValue, setPhoneValue] = React.useState<string>(value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    setPhoneValue(e.target.value)
  }

  const validation = validatePhoneNumber(phoneValue)
  const areaCodes = !validation.country?.areaCodes
    ? // @ts-expect-error priority is typed wrongly for some reason, it's an array of strings
      validation.country?.priority?.join(', ') ?? 'N/A'
    : validation.country?.areaCodes?.join(', ')

  return (
    <>
      <PhoneInputFieldComponent
        label={label}
        onChange={handleChange}
        id={id}
        mandatory={mandatory}
        value={value}
      />
      <div>
        <p>{`Value: ${phoneValue}`}</p>
        <p>{`Possible? ${isPossibleE164Number(phoneValue)}`}</p>
        <p>{`Valid? ${isValidE164Number(phoneValue)}`}</p>
        <p>{`Country? ${validation.country?.name ?? ''}`}</p>
        <p>{`Dial Code? ${validation.country?.dialCode ?? ''}`}</p>
        <p>{`Area Codes? ${areaCodes}`}</p>
      </div>
    </>
  )
}

PhoneInputField.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export const FixedCountriesPhoneInputField: Story<PhoneInputFieldProps> = ({
  id,
  onChange,
  mandatory,
  availableCountries,
  value,
  initialCountry = 'gb',
}) => {
  const { isPossibleE164Number, validatePhoneNumber, isValidE164Number } =
    useValidate()
  const [phoneValue, setPhoneValue] = React.useState<string>(value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    setPhoneValue(e.target.value)
  }

  const validation = validatePhoneNumber(phoneValue)
  const areaCodes = !validation.country?.areaCodes
    ? // @ts-expect-error priority is typed wrongly for some reason, it's an array of strings
      validation.country?.priority?.join(', ') ?? 'N/A'
    : validation.country?.areaCodes?.join(', ')

  return (
    <ThemeProvider accentColor="#004ac2">
      <PhoneInputFieldComponent
        label={'Fixed Countries Phone Number'}
        onChange={handleChange}
        id={id}
        mandatory={mandatory}
        value={value}
        initialCountry={initialCountry}
        availableCountries={availableCountries}
      />
      <div>
        <p>{`Value: ${phoneValue}`}</p>
        <p>{`Possible? ${isPossibleE164Number(phoneValue)}`}</p>
        <p>{`Valid and within available countries? ${isValidE164Number(
          phoneValue,
          availableCountries
        )}`}</p>
        <p>{`Country? ${validation.country?.name ?? ''}`}</p>
        <p>{`Dial Code? ${validation.country?.dialCode ?? ''}`}</p>
        <p>{`Area Codes? ${areaCodes}`}</p>
      </div>
    </ThemeProvider>
  )
}

PhoneInputField.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
