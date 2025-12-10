/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { useAccentColor } from '../../../hooks/useAccentColor'
import { type BookingSuccessfulFunction } from './calDotComTypes'

export interface CalDotComSchedulingProps {
  calLink: string
  /**
   * Base URL for your Cal.com deployment.
   * Defaults to 'https://cal.com' but can be overridden for enterprise
   * Cal.com accounts with custom domains (e.g., 'https://joinavela.cal.com').
   */
  calOrigin?: string
  onBookingSuccessful: BookingSuccessfulFunction
  hideEventTypeDetails?: boolean
  /**
   * See https://youtu.be/5MybtA2rdBU?t=146
   */
  metadata?: { [key: string]: string }
}

export const CalDotComScheduling: FC<CalDotComSchedulingProps> = ({
  calLink,
  calOrigin,
  hideEventTypeDetails = false,
  onBookingSuccessful,
  metadata,
}) => {
  const { accentColor } = useAccentColor()
  const eventListenerRef = useRef(false)
  const calApiRef = useRef<any>(null)

  const bookingSuccessfulCallback = (e: { detail: { data: any } }) => {
    const { data } = e.detail
    const { confirmed, eventType, date, booking } = data
    onBookingSuccessful({ confirmed, eventType, date, booking })
  }

  const initComponent = async () => {
    const cal = await getCalApi()
    calApiRef.current = cal

    if (cal && !eventListenerRef.current) {
      cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: accentColor } },
        hideEventTypeDetails,
      })

      cal('on', {
        action: 'bookingSuccessful',
        callback: bookingSuccessfulCallback,
      })

      eventListenerRef.current = true
    }
  }

  useEffect(() => {
    initComponent()

    return () => {
      const cleanup = async () => {
        const cal = calApiRef.current || (await getCalApi())
        if (cal && eventListenerRef.current) {
          cal('off', {
            action: 'bookingSuccessful',
            callback: bookingSuccessfulCallback,
          })
          eventListenerRef.current = false
        }
      }
      cleanup()
    }
  }, [accentColor, hideEventTypeDetails])

  let metadataString = ''

  if (metadata) {
    metadataString = Object.entries(metadata)
      .map(([key, value]) => `metadata[${key}]=${value}`)
      .join('&')
  }

  const metadataSeparator = calLink.includes('?') ? '&' : '?'

  const composedCalLink = `${calLink}${
    metadataString ? `${metadataSeparator}${metadataString}` : ''
  }`

  return (
    <div>
      <Cal
        calLink={composedCalLink}
        calOrigin={calOrigin}
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      />
    </div>
  )
}
