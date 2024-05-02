import { FC, useEffect } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { useAccentColor } from '../../../hooks/useAccentColor'
import { type BookingSuccessfulFunction } from './calDotComTypes'

export interface CalDotComSchedulingProps {
  calLink: string
  onBookingSuccessful: BookingSuccessfulFunction
  hideEventTypeDetails?: boolean
  /**
   * See https://youtu.be/5MybtA2rdBU?t=146
   */
  metadata?: {
    [key: string]: string
  }
}

export const CalDotComScheduling: FC<CalDotComSchedulingProps> = ({
  calLink,
  hideEventTypeDetails = false,
  onBookingSuccessful,
  metadata,
}) => {
  const { accentColor } = useAccentColor()

  const initComponent = async () => {
    const cal = await getCalApi()

    if (cal) {
      cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: accentColor } },
        hideEventTypeDetails,
      })

      cal('on', {
        action: 'bookingSuccessful',
        callback: (e: { detail: { data: any } }) => {
          // `data` is properties for the event.
          const { data } = e.detail

          // `confirmed`: whether confirmation from organizer is pending or not
          // `eventType`: Object for Event Type that has been booked
          // `date`: date of Event
          const { confirmed, eventType, date, booking } = data

          onBookingSuccessful({
            confirmed,
            eventType: eventType,
            date,
            booking,
          })
        },
      })
    }
  }

  useEffect(() => {
    initComponent()
  }, [])

  let metadataString = ''

  if (metadata) {
    metadataString = Object.entries(metadata)
      .map(([key, value]) => `metadata[${key}]=${value}`)
      .join('&')
  }

  /**
   * Check if calLink already contains a '?'
   * If that's the case, we want to make sure to preserve it and
   * just append the metadata
   */
  const metadataSeparator = calLink.includes('?') ? '&' : '?'

  const composedCalLink = `${calLink}${
    metadataString ? `${metadataSeparator}${metadataString}` : ''
  }`

  return (
    <Cal
      calLink={composedCalLink}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    />
  )
}
