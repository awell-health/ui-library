import { validatePhone } from 'react-international-phone'
import { getDefaultCountries } from '../../atoms/phoneInputField'
import { ValidatePhoneReturn, CountryIso2 } from './types'
import {
  AllowedDatesOptions,
  Maybe,
  QuestionConfig,
} from '../../types/generated/types-orchestration'
import { isEmpty, isNil } from 'lodash'
import { isToday } from 'date-fns'
import { isValidEmail } from '../../molecules/question/helpers/isValidEmail'

export type DateValidationErrorType =
  | 'DATE_CANNOT_BE_IN_THE_FUTURE'
  | 'DATE_CANNOT_BE_IN_THE_PAST'
  | 'DATE_CANNOT_BE_TODAY'

export type NumberValidationErrorType = 'NOT_A_NUMBER' | 'OUT_OF_RANGE'

export type EmailValidationErrorType = 'INVALID_FORMAT'

export type AttachmentsValidationErrorType = 'REQUIRED' | 'INVALID_FORMAT'

export type InputValidationErrorType = 'INVALID_FORMAT'

export interface UseValidateHook {
  validatePhoneNumber: (
    number: string,
    availableCountries?: Array<CountryIso2>
  ) => ValidatePhoneReturn
  isValidE164Number: (
    number: string,
    availableCountries?: Array<CountryIso2>
  ) => boolean
  isPossibleE164Number: (number: string) => boolean
  numberMatchesAvailableCountries: (
    number: string,
    availableCountries: Array<CountryIso2>
  ) => boolean
  validateDateResponse: (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ) => {
    isValid: boolean
    errorType?: DateValidationErrorType
  }
  validateNumberResponse: (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ) => {
    isValid: boolean
    errorType?: NumberValidationErrorType
  }
  validateEmailResponse: (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ) => {
    isValid: boolean
    errorType?: EmailValidationErrorType
  }
  validateAttachmentsResponse: (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ) => {
    isValid: boolean
    errorType?: AttachmentsValidationErrorType
  }
  validateInputValidationResponse: (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ) => {
    isValid: boolean
    errorType?: InputValidationErrorType
  }
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
    countries: getDefaultCountries(['us'], undefined),
    charAfterDialCode: '',
    prefix: '+',
  })
  return USValidation
}

export const useValidate = (): UseValidateHook => {
  const validatePhoneNumber = (
    number: string,
    availableCountries?: Array<CountryIso2>
  ): ValidatePhoneReturn => {
    const validation = validatePhone(number, {
      countries: getDefaultCountries(availableCountries, undefined),
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
    availableCountries?: Array<CountryIso2>
  ): boolean => {
    const validation = validatePhone(number, {
      countries: getDefaultCountries(availableCountries, undefined),
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
    availableCountries: Array<CountryIso2>
  ) => {
    try {
      let validation = validatePhone(number, {
        countries: getDefaultCountries(availableCountries, undefined),
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

  const validateDateResponse = (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ): {
    isValid: boolean
    errorType?: DateValidationErrorType
  } => {
    const inputRequired = questionConfig?.mandatory

    // skip validation if input is not required and empty
    if (inputRequired === false && isEmpty(value)) {
      return {
        isValid: true,
      }
    }

    // No validation needed if date config is not configured
    if (!questionConfig || !questionConfig.date) {
      return {
        isValid: true,
      }
    }

    const parsedDate = new Date(`${value}T00:00:00`)
    const dateIsToday = isToday(parsedDate)

    const { allowed_dates, include_date_of_response = false } =
      questionConfig.date

    if (allowed_dates === AllowedDatesOptions.All) {
      return {
        isValid: true,
      }
    }

    if (dateIsToday) {
      if (include_date_of_response === true) {
        return {
          isValid: true,
        }
      } else {
        return {
          isValid: false,
          errorType: 'DATE_CANNOT_BE_TODAY',
        }
      }
    }

    if (
      allowed_dates === AllowedDatesOptions.Past &&
      parsedDate >= new Date()
    ) {
      return {
        isValid: false,
        errorType: 'DATE_CANNOT_BE_IN_THE_FUTURE',
      }
    }

    if (
      allowed_dates === AllowedDatesOptions.Future &&
      parsedDate <= new Date()
    ) {
      return {
        isValid: false,
        errorType: 'DATE_CANNOT_BE_IN_THE_PAST',
      }
    }

    return {
      isValid: true,
    }
  }

  const validateNumberResponse = (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ): {
    isValid: boolean
    errorType?: NumberValidationErrorType
  } => {
    const inputRequired = questionConfig?.mandatory

    // skip validation if input is not required and empty
    if (inputRequired === false && isEmpty(value)) {
      return {
        isValid: true,
      }
    }

    const isNumber = !isNaN(Number(value))
    if (!isNumber) {
      return {
        isValid: false,
        errorType: 'NOT_A_NUMBER',
      }
    }

    // No validation needed if date config is not configured
    if (!questionConfig || !questionConfig.number) {
      return {
        isValid: true,
      }
    }

    const isRangeEnabled =
      !isNil(questionConfig?.number?.range) &&
      questionConfig.number.range.enabled === true

    if (isRangeEnabled) {
      const range = questionConfig.number?.range
      const min = range?.min ?? 0
      const max = range?.max ?? 0
      const number = Number(value)

      if (number < min || number > max) {
        return {
          isValid: false,
          errorType: 'OUT_OF_RANGE',
        }
      }
    }

    return {
      isValid: true,
    }
  }

  const validateEmailResponse = (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ): {
    isValid: boolean
    errorType?: EmailValidationErrorType
  } => {
    const inputRequired = questionConfig?.mandatory

    // skip validation if input is not required and empty
    if (inputRequired === false && isEmpty(value)) {
      return {
        isValid: true,
      }
    }

    if (!isValidEmail(value)) {
      return {
        isValid: false,
        errorType: 'INVALID_FORMAT',
      }
    }

    return {
      isValid: true,
    }
  }

  const validateAttachmentsResponse = (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ): {
    isValid: boolean
    errorType?: AttachmentsValidationErrorType
  } => {
    const inputRequired = questionConfig?.mandatory

    const parseAttachments = (val: string) => {
      try {
        return JSON.parse(val)
      } catch (error) {
        return []
      }
    }

    const attachments = parseAttachments(value)

    // skip validation if input is not required and empty
    if (inputRequired === false && isEmpty(attachments)) {
      return {
        isValid: true,
      }
    }

    if (attachments.length === 0) {
      return {
        isValid: false,
        errorType: 'REQUIRED',
      }
    }

    return {
      isValid: true,
    }
  }

  const validateInputValidationResponse = (
    questionConfig: Maybe<QuestionConfig> | undefined,
    value: string
  ): {
    isValid: boolean
    errorType?: InputValidationErrorType
  } => {
    if (!questionConfig || !questionConfig.input_validation) {
      return {
        isValid: true,
      }
    }

    const { pattern } = questionConfig.input_validation

    if (pattern) {
      const regex = new RegExp(pattern)
      if (!regex.test(value)) {
        return {
          isValid: false,
          errorType: 'INVALID_FORMAT',
        }
      }
    }

    return {
      isValid: true,
    }
  }

  return {
    isValidE164Number,
    isPossibleE164Number,
    validatePhoneNumber,
    numberMatchesAvailableCountries,
    validateDateResponse,
    validateNumberResponse,
    validateEmailResponse,
    validateAttachmentsResponse,
    validateInputValidationResponse,
  }
}
