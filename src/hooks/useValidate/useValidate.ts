import { validatePhone } from 'react-international-phone'
import { getDefaultCountries } from '../../atoms/phoneInputField'
import { ValidatePhoneReturn, CountryIso2 } from './types'

export interface UseValidateHook {
  validatePhoneNumber: (
    number: string,
    availableCountries?: CountryIso2 | Array<CountryIso2>
  ) => ValidatePhoneReturn
  isValidE164Number: (
    number: string,
    availableCountries?: CountryIso2 | Array<CountryIso2>
  ) => boolean
  isPossibleE164Number: (number: string) => boolean
  numberMatchesAvailableCountries: (
    number: string,
    availableCountries: CountryIso2 | Array<CountryIso2>
  ) => boolean
}

export const handleUSException = (
  number: string,
  originalValidation: ValidatePhoneReturn
): ValidatePhoneReturn => {
  const areaCodes = originalValidation.country?.areaCodes
  const providedAreaCode = number.slice(2, 5)
  if (providedAreaCode.length === 3 && areaCodes?.includes(providedAreaCode)) {
    return originalValidation
  }
  const USValidation = validatePhone(number, {
    countries: getDefaultCountries('us'),
    charAfterDialCode: '',
    prefix: '+',
  })
  return USValidation
}

export const useValidate = (): UseValidateHook => {
  const validatePhoneNumber = (
    number: string,
    availableCountries?: CountryIso2 | Array<CountryIso2>
  ): ValidatePhoneReturn => {
    const validation = validatePhone(number, {
      countries: getDefaultCountries(availableCountries),
      charAfterDialCode: '',
      prefix: '+',
    })

    // exception for US numbers since it shares the same country code as Canada
    if (number.startsWith('+1') && validation.isValid === false) {
      return handleUSException(number, validation)
    }

    return validation
  }

  const isValidE164Number = (
    number: string,
    availableCountries?: CountryIso2 | Array<CountryIso2>
  ): boolean => {
    const validation = validatePhone(number, {
      countries: getDefaultCountries(availableCountries),
      charAfterDialCode: '',
      prefix: '+',
    })

    // exception for US numbers since it shares the same country code as Canada
    if (number.startsWith('+1') && validation.isValid === false) {
      return handleUSException(number, validation).isValid
    }

    return validation.isValid
  }

  const numberMatchesAvailableCountries = (
    number: string,
    availableCountries: CountryIso2 | Array<CountryIso2>
  ) => {
    try {
      let validation = validatePhone(number, {
        countries: getDefaultCountries(availableCountries),
        charAfterDialCode: '',
        prefix: '+',
      })

      // exception for US numbers since it shares the same country code as Canada
      if (number.startsWith('+1') && validation.isValid === false) {
        validation = handleUSException(number, validation)
      }
      if (!validation.country) {
        return false
      }

      if (typeof availableCountries === 'string') {
        return availableCountries === validation.country.iso2 ?? false
      }
      return availableCountries.includes(validation.country.iso2)
    } catch {
      return false
    }
  }

  const isPossibleE164Number = (number: string) => {
    return /^\+?[1-9]\d{1,14}$/.test(number)
  }

  return {
    isValidE164Number,
    isPossibleE164Number,
    validatePhoneNumber,
    numberMatchesAvailableCountries,
  }
}
