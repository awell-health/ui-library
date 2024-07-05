import { FC, useState } from 'react'
import classes from './AppointmentTypes.module.scss'
import { Field, Radio, RadioGroup } from '@headlessui/react'

export type AppointmentTypesProps = {
  appointmentTypes: {
    id: string
    name: string
    length: number
    clients_have_credit: boolean
    client_call_provider: boolean
    availability_exists_for: boolean
    valid_state_licensing_for: boolean
    available_contact_types: string[]
    is_group: boolean
    is_waitlist_enabled: boolean
    require_in_state_clients: boolean
    has_available_group_appts: boolean | null
  }[]
}

export const AppointmentTypes: FC<AppointmentTypesProps> = ({
  appointmentTypes,
}) => {
  const [selectedAppointmentTypeId, setSelectedAppointmentTypeId] = useState<
    null | string
  >(null)

  return (
    <fieldset className={classes.fieldset} aria-label="Appointment type">
      <RadioGroup
        value={selectedAppointmentTypeId}
        onChange={setSelectedAppointmentTypeId}
        className={classes.group}
      >
        {appointmentTypes.map((appointmentType) => (
          <Field
            key={appointmentType.id}
            disabled={!appointmentType.availability_exists_for}
          >
            <Radio
              key={appointmentType.name}
              value={appointmentType.id}
              aria-label={appointmentType.name}
              aria-description={`${appointmentType.name}, ${appointmentType.length} minutes`}
              className={`${classes.radio_option} ${
                appointmentType.availability_exists_for === false
                  ? classes.noAvailability
                  : ''
              }`}
              disabled={!appointmentType.availability_exists_for}
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
                {appointmentType.available_contact_types.join(' or ')}
              </div>
            </Radio>
          </Field>
        ))}
      </RadioGroup>
    </fieldset>
  )
}
