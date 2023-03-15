import { CalDotComBookingSuccessfulFunction } from '../../../../atoms/scheduling/cal.com'

export interface CalDotComActivityProps {
  calLink: string
  onBookingSuccessful: CalDotComBookingSuccessfulFunction
  hideEventTypeDetails: boolean
}
