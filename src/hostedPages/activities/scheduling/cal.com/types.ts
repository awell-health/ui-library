import { CalDotComBookingSuccessfulFunction } from '../../../../atoms/scheduling/cal.com'

export interface CalDotComActivityProps {
  calLink: string
  /**
   * Base URL for your Cal.com deployment.
   * Defaults to 'https://cal.com' but can be overridden for enterprise
   * Cal.com accounts with custom domains (e.g., 'https://joinavela.cal.com').
   */
  calOrigin?: string
  onBookingSuccessful: CalDotComBookingSuccessfulFunction
  hideEventTypeDetails: boolean
}
