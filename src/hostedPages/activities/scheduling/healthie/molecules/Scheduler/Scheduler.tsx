import { FC } from 'react'
import classes from './Scheduler.module.scss'
import { AppointmentTypeOverview, Slots } from '../../atoms'
import { Calendar } from '../../../../../../atoms'

export type SchedulerProps = {
  appointmentName: string
  appointmentLength: number
  appointmentCallType: string
  date?: Date
  slot?: Date
  onDateSelect: (date: Date) => void
  onSlotSelect: (date: Date) => void
}

export const Scheduler: FC<SchedulerProps> = ({
  date,
  slot,
  appointmentName,
  appointmentLength,
  appointmentCallType,
  onDateSelect,
  onSlotSelect,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.meta}>
        <AppointmentTypeOverview
          name={appointmentName}
          length={appointmentLength}
          contactType={appointmentCallType}
        />
      </div>
      <div className={classes.main}>
        <Calendar value={date} onSelect={onDateSelect} />
      </div>
      <div className={classes.timeslots}>
        <Slots
          value={slot}
          slotDate={date}
          onSelect={onSlotSelect}
          slots={[
            new Date('2025-07-10T22:00:00.000Z'),
            new Date('2025-07-10T22:15:00.000Z'),
            new Date('2025-07-10T22:30:00.000Z'),
            new Date('2025-07-10T22:45:00.000Z'),
            new Date('2025-07-10T23:00:00.000Z'),
            new Date('2025-07-10T23:15:00.000Z'),
            new Date('2025-07-10T23:30:00.000Z'),
            new Date('2025-07-10T23:45:00.000Z'),
          ]}
        />
      </div>
    </div>
  )
}
