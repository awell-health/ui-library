import { FC, useState } from 'react'
import classes from './Slots.module.scss'
import { Field, Radio, RadioGroup } from '@headlessui/react'
import { format } from 'date-fns'
import { isEmpty } from 'lodash'
import { CircularSpinner } from '../../../../../../atoms'

export interface SlotsProps {
  value?: Date
  slotDate?: Date
  slots?: Date[]
  timeZone: string
  onSelect: (date: Date) => void
  loading?: boolean
  text?: {
    slotsLabel?: string
    selectDateLabel?: string
    noSlotsLabel?: string
  }
}

export const Slots: FC<SlotsProps> = ({
  value,
  slotDate,
  slots,
  timeZone,
  loading,
  onSelect,
  text,
}) => {
  const {
    slotsLabel = 'Slots',
    selectDateLabel = 'Select a date first',
    noSlotsLabel = 'No slots available',
  } = text || {}

  const formatSlotTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone,
    }

    // Always format in US format (12h notation + AM/PM)
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  const formatTitleDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy')
  }

  const handleSlotSelect = (date: Date) => {
    onSelect(date)
  }

  return (
    <div>
      {slotDate ? (
        <h3 className={classes.title}>{formatTitleDate(slotDate)}</h3>
      ) : (
        <h3 className={classes.title}>{slotsLabel}</h3>
      )}
      {loading && (
        <div className={classes.loading}>
          <CircularSpinner size="sm" />
        </div>
      )}
      {!loading && !slotDate && (
        <>
          <p>{selectDateLabel}</p>
        </>
      )}
      {!loading && slotDate && isEmpty(slots) && <div>{noSlotsLabel}</div>}
      {!loading && slotDate && !isEmpty(slots) && (
        <div className={classes.slotList}>
          <div className={classes.scrollContainer}>
            <div className={classes.scrollBar}>
              <fieldset
                className={classes.fieldset}
                aria-label="Appointment type"
              >
                <RadioGroup
                  value={value}
                  onChange={handleSlotSelect}
                  className={classes.group}
                >
                  {slots?.map((slot) => (
                    <Field key={slot.toISOString()}>
                      <Radio
                        key={slot.toISOString()}
                        value={slot}
                        aria-label={slot.toISOString()}
                        aria-description={slot.toISOString()}
                        className={classes.radio_option}
                      >
                        {formatSlotTime(slot)}
                      </Radio>
                    </Field>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
