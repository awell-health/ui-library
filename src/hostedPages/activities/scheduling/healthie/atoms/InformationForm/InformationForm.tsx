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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onSubmit: (values: FormBookingValues) => void
  errors: Partial<FormBookingValues>
  text?: {
    title?: string
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
}

export type FormBookingValues = {
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
  onChange,
  onSubmit,
  errors,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ firstName, lastName, email, phoneNumber, reason })
  }

  const {
    title = 'Complete your information',
    firstNameLabel = 'First name',
    lastNameLabel = 'Last name',
    emailLabel = 'Email',
    phoneNumberLabel = 'Phone number',
    reasonLabel = 'Reason for appointment',
    submitButtonLabel = 'Submit',
  } = text || {}

  return (
    <div>
      <h3 className={classes.heading}>{title}</h3>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.row}>
          <div className={classes.field}>
            <InputField
              id="firstName"
              label={firstNameLabel}
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChange}
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
              value={lastName}
              onChange={onChange}
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
              value={email}
              onChange={onChange}
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
              onChange={onChange}
              mandatory={true}
              value={phoneNumber}
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
            value={reason}
            onChange={onChange}
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
