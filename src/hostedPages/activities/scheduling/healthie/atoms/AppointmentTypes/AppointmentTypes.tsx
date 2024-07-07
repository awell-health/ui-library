import React from 'react'
import { FC } from 'react'
import classes from './AppointmentTypes.module.scss'
import { Field, Radio, RadioGroup } from '@headlessui/react'

export type AppointmentTypesProps = {
  value?: string
  appointmentTypes: {
    id: string
    name: string
    length: number
    disabled: boolean
    availableContactTypes: string[]
  }[]
  onSelect: (id: string) => void
}

export const AppointmentTypes: FC<AppointmentTypesProps> = ({
  value,
  appointmentTypes,
  onSelect,
}) => {
  return (
    <fieldset className={classes.fieldset} aria-label="Appointment type">
      <RadioGroup value={value} onChange={onSelect} className={classes.group}>
        {appointmentTypes.map((appointmentType) => (
          <Field key={appointmentType.id} disabled={appointmentType.disabled}>
            <Radio
              key={appointmentType.name}
              value={appointmentType.id}
              aria-label={appointmentType.name}
              className={`${classes.radio_option} ${
                appointmentType.disabled ? classes.noAvailability : ''
              }`}
              disabled={appointmentType.disabled}
            >
              <div className={classes.flex_container}>
                <span className={classes.flex_col}>
                  <span className={classes.appointmentName}>
                    {appointmentType.name}
                  </span>
                  <span className={classes.appointmentLength}>
                    {appointmentType.length} minutes
                  </span>
                </span>
              </div>
              <div className={classes.appointmentTypes}>
                {appointmentType.availableContactTypes.join(' or ')}
              </div>
            </Radio>
          </Field>
        ))}
      </RadioGroup>
    </fieldset>
  )
}
