import { FC, useState } from 'react'
import classes from './Slots.module.scss'
import { Field, Radio, RadioGroup } from '@headlessui/react'
import { format } from 'date-fns'

export interface SlotsProps {
  value?: Date
  slotDate?: Date
  slots: Date[]
  onSelect: (date: Date) => void
}

export const Slots: FC<SlotsProps> = ({ value, slotDate, slots, onSelect }) => {
  const [selectedSlot, setSelectedSlot] = useState<Date | undefined>(value)

  const formatSlotTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'America/New_York',
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  const formatTitleDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy')
  }

  const handleSlotSelect = (date: Date) => {
    setSelectedSlot(date)
    onSelect(date)
  }

  return (
    <div>
      {slotDate && (
        <h3 className={classes.title}>{formatTitleDate(slotDate)}</h3>
      )}
      {!slotDate && (
        <>
          <h3 className={classes.title}>Slots</h3>
          <p>Select a date first</p>
        </>
      )}
      {slotDate && (
        <div className={classes.slotList}>
          <div className={classes.scrollContainer}>
            <div className={classes.scrollBar}>
              <fieldset
                className={classes.fieldset}
                aria-label="Appointment type"
              >
                <RadioGroup
                  value={selectedSlot}
                  onChange={handleSlotSelect}
                  className={classes.group}
                >
                  {slots.map((slot) => (
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
