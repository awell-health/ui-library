import { FC, useState } from 'react'
import classes from './InformationForm.module.scss'
import { InputField, LongTextField, Button } from '../../../../../../atoms'
import { PhoneInputField } from '../../../../../../atoms/phoneInputField'
import { useValidate } from '../../../../../../hooks'
import { isEmpty } from 'lodash'

export type InformationFormProps = {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  reason?: string
  text?: {
    firstNameLabel?: string
    lastNameLabel?: string
    emailLabel?: string
    phoneNumberLabel?: string
    reasonLabel?: string
    submitButtonLabel?: string
    errors?: {
      firstNameRequired?: string
      lastNameRequired?: string
      emailRequired?: string
      emailInvalid?: string
      phoneNumberRequired?: string
      phoneNumberInvalid?: string
    }
  }
  onSubmit: (values: FormValues) => void
}

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  reason: string
}

export const InformationForm: FC<InformationFormProps> = ({
  firstName = '',
  lastName = '',
  email = '',
  phoneNumber = '',
  reason = '',
  text,
  onSubmit,
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName,
    lastName,
    email,
    phoneNumber,
    reason,
  })
  const { isValidE164Number, isPossibleE164Number } = useValidate()

  const [errors, setErrors] = useState<Partial<FormValues>>({})

  const {
    firstNameLabel = 'First name',
    lastNameLabel = 'Last name',
    emailLabel = 'Email',
    phoneNumberLabel = 'Phone number',
    reasonLabel = 'Reason for appointment',
    submitButtonLabel = 'Submit',
    errors: {
      firstNameRequired = 'First name is required',
      lastNameRequired = 'Last name is required',
      emailRequired = 'Email is required',
      emailInvalid = 'Invalid email address',
      phoneNumberRequired = 'Phone number is required',
      phoneNumberInvalid = 'Not a valid phone number',
    } = {},
  } = text || {}

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
    const newErrors: Partial<FormValues> = {}

    if (isEmpty(formValues.firstName)) newErrors.firstName = firstNameRequired
    if (isEmpty(formValues.lastName)) newErrors.lastName = lastNameRequired
    if (isEmpty(formValues.email)) {
      newErrors.email = emailRequired
    } else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) {
      newErrors.email = emailInvalid
    }
    if (isEmpty(formValues.phoneNumber))
      newErrors.phoneNumber = phoneNumberRequired

    if (
      !isValidE164Number(formValues.phoneNumber) ||
      !isPossibleE164Number(formValues.phoneNumber)
    )
      newErrors.phoneNumber = phoneNumberInvalid

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formValues)
    }
  }

  return (
    <div>
      <h3 className={classes.heading}>Complete your information</h3>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.row}>
          <div className={classes.field}>
            <InputField
              id="firstName"
              label={firstNameLabel}
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              placeholder={firstNameLabel}
              mandatory={true}
            />
            {errors.firstName && (
              <span className={classes.error}>{errors.firstName}</span>
            )}
          </div>

          <div className={classes.field}>
            <InputField
              id="lastName"
              label={lastNameLabel}
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              placeholder={lastNameLabel}
              mandatory={true}
            />
            {errors.lastName && (
              <span className={classes.error}>{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.field}>
            <InputField
              id="email"
              label={emailLabel}
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder={emailLabel}
              mandatory={true}
            />
            {errors.email && (
              <span className={classes.error}>{errors.email}</span>
            )}
          </div>

          <div className={classes.field}>
            <PhoneInputField
              id="phoneNumber"
              name="phoneNumber"
              label={phoneNumberLabel}
              //@ts-ignore this is okay
              onChange={handleChange}
              mandatory={true}
              value={formValues.phoneNumber}
            />
            {errors.phoneNumber && (
              <span className={classes.error}>{errors.phoneNumber}</span>
            )}
          </div>
        </div>

        <div className={classes.field}>
          <LongTextField
            id="reason"
            label={reasonLabel}
            name="reason"
            value={formValues.reason}
            onChange={handleChange}
            placeholder={reasonLabel}
          />
          {errors.reason && (
            <span className={classes.error}>{errors.reason}</span>
          )}
        </div>

        <div className={classes.buttonWrapper}>
          <Button onClick={() => null} type="submit">
            {submitButtonLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}
