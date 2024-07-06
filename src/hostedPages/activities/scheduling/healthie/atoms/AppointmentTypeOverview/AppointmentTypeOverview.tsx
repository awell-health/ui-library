import { FC } from 'react'
import classes from './AppointmentTypeOverview.module.scss'
import {
  CalendarIcon,
  ClockIcon,
  GlobeAltIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { addMinutes, format } from 'date-fns'

export type AppointmentTypeOverviewProps = {
  bookedSlot?: Date
  name: string
  length?: number
  contactType?: string
}

export const AppointmentTypeOverview: FC<AppointmentTypeOverviewProps> = ({
  bookedSlot,
  name,
  length,
  contactType,
}) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const formatAppointmentDate = (startDate: Date, lengthInMinutes: number) => {
    const endDate = addMinutes(startDate, lengthInMinutes)

    const startTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(startDate)

    const endTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(endDate)

    const formattedDate = format(startDate, 'EEEE, MMMM d, yyyy')

    return (
      <>
        {formattedDate}
        <br />
        {startTime}–{endTime}
      </>
    )
  }

  return (
    <div>
      <h3 className={classes.type}>{name}</h3>
      <div className={classes.list}>
        {bookedSlot && length && (
          <div className={classes.item}>
            <CalendarIcon className={classes.icon} />
            <span>{formatAppointmentDate(bookedSlot, length)}</span>
          </div>
        )}
        {length && (
          <div className={classes.item}>
            <ClockIcon className={classes.icon} />
            <span>{length} minutes</span>
          </div>
        )}
        {contactType && (
          <div className={classes.item}>
            <PhoneIcon className={classes.icon} /> <span>{contactType}</span>
          </div>
        )}
        <div className={classes.item}>
          <GlobeAltIcon className={classes.icon} /> <span>{userTimezone}</span>
        </div>
      </div>
    </div>
  )
}
