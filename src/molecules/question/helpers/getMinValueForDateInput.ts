import { addDays, format } from 'date-fns'
import { isNil } from 'lodash'
import { AllowedDatesOptions, DateConfig, Maybe } from '../../../types'

export const getMinValueForDateInput = (
  dateConfig: Maybe<DateConfig> | undefined
): string | undefined => {
  if (isNil(dateConfig)) {
    return undefined
  }

  if (dateConfig.allowed_dates === AllowedDatesOptions.Future) {
    if (dateConfig.include_date_of_response === true) {
      return format(new Date(), 'yyyy-MM-dd')
    }
    const datePlusOneDay = addDays(new Date(), 1)

    return format(datePlusOneDay, 'yyyy-MM-dd')
  }
  return undefined
}
