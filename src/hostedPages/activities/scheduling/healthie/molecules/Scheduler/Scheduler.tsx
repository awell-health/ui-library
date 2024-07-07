import React from 'react'

import { FC } from 'react'
import classes from './Scheduler.module.scss'
import { AppointmentTypeOverview, Slots } from '../../atoms'
import { Calendar } from '../../../../../../atoms'

export type SchedulerProps = {
  appointmentName: string
  appointmentLength: number
  appointmentCallType: string
  timeZone: string
  date?: Date
  slot?: Date
  availableDays?: Date[]
  availableSlots?: Date[]
  loadingAvailableDays?: boolean
  loadingAvailableSlots?: boolean
  onDateSelect: (date: Date) => void
  onSlotSelect: (date: Date) => void
}

export const Scheduler: FC<SchedulerProps> = ({
  date,
  slot,
  timeZone,
  appointmentName,
  appointmentLength,
  appointmentCallType,
  availableDays,
  availableSlots,
  loadingAvailableDays,
  loadingAvailableSlots,
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
          timezone={timeZone}
        />
      </div>
      <div className={classes.main}>
        <Calendar
          value={date}
          onSelect={onDateSelect}
          loading={loadingAvailableDays}
          availableDates={availableDays}
        />
      </div>
      <div className={classes.timeslots}>
        <Slots
          value={slot}
          slotDate={date}
          onSelect={onSlotSelect}
          slots={availableSlots}
          timeZone={timeZone}
          loading={loadingAvailableSlots}
        />
      </div>
    </div>
  )
}
