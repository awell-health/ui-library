import { usePhoneValidation } from 'react-international-phone'
import { getDefaultCountries } from '../../atoms/phoneInputField'

interface UseValidateHook {
  isPossibleE164Number: (number: string) => boolean
  isValidE164Number: (number: string) => boolean
}

export const useValidate = (): UseValidateHook => {
  const isValidE164Number = (number: string) => {
    return (
      usePhoneValidation(number, {
        countries: getDefaultCountries(),
        charAfterDialCode: '',
        prefix: '+',
      }).isValid ?? false
    )
  }

  const isPossibleE164Number = (number: string) => {
    return /^\+?[1-9]\d{1,14}$/.test(number)
  }

  return {
    isValidE164Number,
    isPossibleE164Number,
  }
}
