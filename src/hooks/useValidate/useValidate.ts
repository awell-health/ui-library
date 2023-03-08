import { CountryIso2, validatePhone } from 'react-international-phone'
import { ValidatePhoneReturn } from 'react-international-phone/build/utils'
import { getDefaultCountries } from '../../atoms/phoneInputField'

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

    return validation.isValid
  }

  const numberMatchesAvailableCountries = (
    number: string,
    availableCountries: CountryIso2 | Array<CountryIso2>
  ) => {
    const validation = validatePhone(number, {
      countries: getDefaultCountries(availableCountries),
      charAfterDialCode: '',
      prefix: '+',
    })

    if (!availableCountries || validation.country?.iso2 == null)
      throw new Error(`Country could not be parsed for ${number}`)

    if (typeof availableCountries === 'string') {
      return availableCountries === validation.country.iso2 ?? false
    }
    return availableCountries.includes(validation.country.iso2)
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
