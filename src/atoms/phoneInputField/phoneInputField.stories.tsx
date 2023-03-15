import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { PhoneInputField as PhoneInputFieldComponent, PhoneInputFieldProps } from './PhoneInputField'
import { useValidate } from '../../hooks/useValidate'
import { ThemeProvider } from '../themeProvider'

export default {
  title: 'Atoms/Input Field',
  component: PhoneInputFieldComponent,
  argTypes: {
    value: {
      control: 'text',
      defaultValue: '',
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
      defaultValue: ['gb', 'us', 'fr', 'de', 'es', 'it', 'nl', 'be', 'ca', 'au', 'nz'],
    }
  },
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          padding: '1em',
        }}
      >
        <StoryComponent />
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
  const { isPossibleE164Number, validatePhoneNumber, isValidE164Number } = useValidate()
  const [phoneValue, setPhoneValue] = React.useState<string>(value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e)
      setPhoneValue(e.target.value)
  }
  return (
    <ThemeProvider accentColor="#004ac2">
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
        <p>{`Country? ${validatePhoneNumber(phoneValue).country?.name ?? ''}`}</p>
        <p>{`Dial Code? ${validatePhoneNumber(phoneValue).country?.dialCode ?? ''}`}</p>
        <p>{`Area Codes? ${validatePhoneNumber(phoneValue).country?.areaCodes?.join(', ') ?? 'N/A'}`}</p>
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

export const FixedCountriesPhoneInputField: Story<PhoneInputFieldProps> = ({
  id,
  onChange,
  mandatory,
  availableCountries,
  value,
  initialCountry = 'gb',
}) => {
  const { isPossibleE164Number, validatePhoneNumber, isValidE164Number } = useValidate()
  const [phoneValue, setPhoneValue] = React.useState<string>(value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    setPhoneValue(e.target.value)
  }
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
        <p>{`Valid and within available countries? ${isValidE164Number(phoneValue, availableCountries)}`}</p>
        <p>{`Country? ${validatePhoneNumber(phoneValue, availableCountries).country?.name ?? ''}`}</p>
        <p>{`Dial Code? ${validatePhoneNumber(phoneValue, availableCountries).country?.dialCode ?? ''}`}</p>
        <p>{`Area Codes? ${validatePhoneNumber(phoneValue, availableCountries).country?.areaCodes?.join(', ') ?? 'N/A'}`}</p>
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
