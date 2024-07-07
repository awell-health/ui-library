import { useState } from 'react'
import { isEmpty } from 'lodash'
import { useValidate } from '../../../../../../hooks'
import { FormBookingValues } from './InformationForm'

type UseInformationFormReturn = {
  formValues: FormBookingValues
  errors: Partial<FormBookingValues>
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  validate: () => boolean
  setFormValues: React.Dispatch<React.SetStateAction<FormBookingValues>>
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormBookingValues>>>
}

export const useInformationForm = (
  initialValues: FormBookingValues,
  errorLabels?: {
    firstNameRequired?: string
    lastNameRequired?: string
    emailRequired?: string
    emailInvalid?: string
    phoneNumberRequired?: string
    phoneNumberInvalid?: string
  }
): UseInformationFormReturn => {
  const [formValues, setFormValues] = useState<FormBookingValues>(initialValues)
  const { isValidE164Number, isPossibleE164Number } = useValidate()
  const [errors, setErrors] = useState<Partial<FormBookingValues>>({})

  const {
    firstNameRequired = 'First name is required',
    lastNameRequired = 'Last name is required',
    emailRequired = 'Email is required',
    emailInvalid = 'Invalid email address',
    phoneNumberRequired = 'Phone number is required',
    phoneNumberInvalid = 'Not a valid phone number',
  } = errorLabels || {}

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const validate = () => {
    const newErrors: Partial<FormBookingValues> = {}

    if (isEmpty(formValues.firstName)) newErrors.firstName = firstNameRequired
    if (isEmpty(formValues.lastName)) newErrors.lastName = lastNameRequired
    if (isEmpty(formValues.email)) {
      newErrors.email = emailRequired
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors.email = emailInvalid
    }
    if (isEmpty(formValues.phoneNumber)) {
      newErrors.phoneNumber = phoneNumberRequired
    } else if (
      !isValidE164Number(formValues.phoneNumber) ||
      !isPossibleE164Number(formValues.phoneNumber)
    ) {
      newErrors.phoneNumber = phoneNumberInvalid
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  return {
    formValues,
    errors,
    handleChange,
    validate,
    setFormValues,
    setErrors,
  }
}
