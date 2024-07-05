import { FC } from 'react'
import classes from './AppointmentTypeOverview.module.scss'
import { ClockIcon, GlobeAltIcon, PhoneIcon } from '@heroicons/react/24/outline'

export type AppointmentTypeOverviewProps = {
  name: string
  length: number
  contactType: string
}

export const AppointmentTypeOverview: FC<AppointmentTypeOverviewProps> = ({
  name,
  length,
  contactType,
}) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <div>
      <h3 className={classes.type}>{name}</h3>
      <div className={classes.list}>
        <div className={classes.apptLength}>
          <ClockIcon className={classes.icon} />
          <span>{length} minutes</span>
        </div>
        <div className={classes.contactType}>
          <PhoneIcon className={classes.icon} /> <span>{contactType}</span>
        </div>
        <div className={classes.timezone}>
          <GlobeAltIcon className={classes.icon} /> <span>{userTimezone}</span>
        </div>
      </div>
    </div>
  )
}
