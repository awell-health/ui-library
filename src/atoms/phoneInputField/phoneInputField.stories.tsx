import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useRef } from 'react'
import { PhoneInputField as PhoneInputFieldComponent, PhoneInputFieldProps } from './PhoneInputField'
import { useValidate } from '../../hooks/useValidate'
import { ThemeProvider } from '../themeProvider'
import { usePhoneInput } from 'react-international-phone'

export default {
  title: 'Atoms/Input Field',
  component: PhoneInputFieldComponent,
  argTypes: {
    value: {
      control: 'text',
      defaultValue: '+447810182855',
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
  const { isPossibleE164Number, isValidE164Number } = useValidate()
  const [phoneValue, setPhoneValue] = React.useState<string>(value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPossibleE164Number(e.target.value)) {
      onChange(e)
      setPhoneValue(e.target.value)
    }
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
