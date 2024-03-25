import { format, subDays } from 'date-fns'
import { isNil } from 'lodash'
import { AllowedDatesOptions, DateConfig, Maybe } from '../../../types'

export const getMaxValueForDateInput = (
  dateConfig: Maybe<DateConfig> | undefined
): string | undefined => {
  if (isNil(dateConfig)) {
    return undefined
  }

  if (dateConfig.allowed_dates === AllowedDatesOptions.Past) {
    if (dateConfig.include_date_of_response === true) {
      return format(new Date(), 'yyyy-MM-dd')
    }
    const dateMinusOneDay = subDays(new Date(), 1)

    return format(dateMinusOneDay, 'yyyy-MM-dd')
  }
  return undefined
}
