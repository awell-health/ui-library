interface BookingSuccessfulFunctionProps {
  confirmed?: boolean
  date?: string
  eventType?: Record<string, unknown>
}

export type BookingSuccessfulFunction = ({
  confirmed,
  date,
  eventType,
}: BookingSuccessfulFunctionProps) => void
