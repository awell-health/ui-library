/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useRef } from 'react'
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
  metadata?: { [key: string]: string }
  defaultFormValues?: { name?: string; email?: string; phone?: string }
}

export const CalDotComScheduling: FC<CalDotComSchedulingProps> = ({
  calLink,
  hideEventTypeDetails = false,
  onBookingSuccessful,
  metadata,
  defaultFormValues,
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

      if (defaultFormValues && Object.keys(defaultFormValues).length > 0) {
        ;(cal as any)('prefill', defaultFormValues)
      }

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
/* Re-apply prefill when defaultFormValues change */
useEffect(() => {
  const applyPrefill = async () => {
    if (!defaultFormValues) return
    const cal = (calApiRef.current || (await getCalApi())) as any
    if (cal) {
      cal('prefill', defaultFormValues)
    }
  }
  applyPrefill()
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [defaultFormValues])


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
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      />
    </div>
  )
}
