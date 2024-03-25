import { renderHook } from '@testing-library/react-hooks'
import { useValidate } from './useValidate'
import { AllowedDatesOptions } from '../../types'

describe('useValidate', () => {
  describe('validatePhoneNumber', () => {
    it('should return an object with isValid set to true for a valid phone number', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+14155552671'
      const validation = result.current.validatePhoneNumber(phoneNumber)
      expect(validation.isValid).toBe(true)
    })

    it('should return an object with isValid set to false for an invalid phone number', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+1415555267'
      const validation = result.current.validatePhoneNumber(phoneNumber)
      expect(validation.isValid).toBe(false)
    })

    it('should return an object with isValid set to true for a valid phone number in a specific country', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+447700900123'
      const validation = result.current.validatePhoneNumber(phoneNumber, ['gb'])
      expect(validation.isValid).toBe(true)
    })

    it('should return an object with isValid set to false for an invalid phone number in a specific country', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+44770090012'
      const validation = result.current.validatePhoneNumber(phoneNumber, ['gb'])
      expect(validation.isValid).toBe(false)
    })
  })

  describe('isValidE164Number', () => {
    it('should return true for a valid phone number', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+14155552671'
      const isValid = result.current.isValidE164Number(phoneNumber)
      expect(isValid).toBe(true)
    })

    it('should return false for an invalid phone number', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+1415555267'
      const isValid = result.current.isValidE164Number(phoneNumber)
      expect(isValid).toBe(false)
    })

    it('should return true for a valid phone number in a specific country', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+447700900123'
      const isValid = result.current.isValidE164Number(phoneNumber, ['gb'])
      expect(isValid).toBe(true)
    })

    it('should return false for an invalid phone number in a specific country', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+44770090012'
      const isValid = result.current.isValidE164Number(phoneNumber, ['gb'])
      expect(isValid).toBe(false)
    })
  })

  describe('isPossibleE164Number', () => {
    it('should return true for a possible E164 number', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+14155552671'
      const isPossible = result.current.isPossibleE164Number(phoneNumber)
      expect(isPossible).toBe(true)
    })

    it('should return false for an impossible E164 number', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+14155552123131267'
      const isPossible = result.current.isPossibleE164Number(phoneNumber)
      expect(isPossible).toBe(false)
    })
  })

  describe('numberMatchesAvailableCountries', () => {
    it('should return true for a phone number that matches a single available country', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+14155552671'
      const matchesAvailableCountries =
        result.current.numberMatchesAvailableCountries(phoneNumber, ['us'])
      expect(matchesAvailableCountries).toBe(true)
    })

    it('should return false for a phone number that does not match a single available country', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+447700900123'
      const matchesAvailableCountries =
        result.current.numberMatchesAvailableCountries(phoneNumber, ['us'])
      expect(matchesAvailableCountries).toBe(false)
    })

    it('should return true for a phone number that matches an array of available countries', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+447700900123'
      const matchesAvailableCountries =
        result.current.numberMatchesAvailableCountries(phoneNumber, [
          'gb',
          'us',
        ])
      expect(matchesAvailableCountries).toBe(true)
    })

    it('should return false for a phone number that does not match an array of available countries', () => {
      const { result } = renderHook(() => useValidate())
      const phoneNumber = '+447700900123'
      const matchesAvailableCountries =
        result.current.numberMatchesAvailableCountries(phoneNumber, [
          'us',
          'ca',
        ])
      expect(matchesAvailableCountries).toBe(false)
    })
  })

  describe('validateDateResponse', () => {
    // Mock current date to ensure consistent results
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date('2024-01-01'))
    })

    describe('when date configuration is not defined', () => {
      it('should return isValid set to true', () => {
        const { result } = renderHook(() => useValidate())
        const pastDate = '2023-01-01'
        expect(
          result.current.validateDateResponse(undefined, pastDate).isValid
        ).toBe(true)
        const todayDate = '2024-01-01'
        expect(
          result.current.validateDateResponse(undefined, todayDate).isValid
        ).toBe(true)
        const futureDate = '2024-01-05'
        expect(
          result.current.validateDateResponse(undefined, futureDate).isValid
        ).toBe(true)
      })
    })

    describe('when date should be in the past', () => {
      it('should return isValid set to true when value is in the past', () => {
        const dateConfig = {
          mandatory: false,
          date: {
            allowed_dates: AllowedDatesOptions.Past,
          },
        }
        const { result } = renderHook(() => useValidate())
        const pastDate = '2023-01-01'
        expect(
          result.current.validateDateResponse(dateConfig, pastDate).isValid
        ).toBe(true)
      })

      it('should return isValid set to false when value is in the future', () => {
        const dateConfig = {
          mandatory: false,
          date: {
            allowed_dates: AllowedDatesOptions.Past,
          },
        }
        const { result } = renderHook(() => useValidate())
        const futureDate = '2024-01-02'
        expect(
          result.current.validateDateResponse(dateConfig, futureDate).isValid
        ).toBe(false)
        expect(
          result.current.validateDateResponse(dateConfig, futureDate).errorType
        ).toBe('DATE_CANNOT_BE_IN_THE_FUTURE')
      })

      it('should return isValid set to false when value is today date and date of response is not allowed', () => {
        const dateConfig = {
          mandatory: false,
          date: {
            allowed_dates: AllowedDatesOptions.Past,
          },
        }
        const { result } = renderHook(() => useValidate())
        const todayDate = '2024-01-01'
        expect(
          result.current.validateDateResponse(dateConfig, todayDate).isValid
        ).toBe(false)
        expect(
          result.current.validateDateResponse(dateConfig, todayDate).errorType
        ).toBe('DATE_CANNOT_BE_TODAY')
      })

      it('should return isValid set to true when value is today date and date of response is allowed', () => {
        const dateConfig = {
          mandatory: false,
          date: {
            allowed_dates: AllowedDatesOptions.Past,
            include_date_of_response: true,
          },
        }
        const { result } = renderHook(() => useValidate())
        const todayDate = '2024-01-01'
        expect(
          result.current.validateDateResponse(dateConfig, todayDate).isValid
        ).toBe(true)
      })
    })

    describe('when date should be in the future', () => {
      it('should return isValid set to true when value is in the future', () => {
        const dateConfig = {
          mandatory: false,
          date: {
            allowed_dates: AllowedDatesOptions.Future,
          },
        }
        const { result } = renderHook(() => useValidate())
        const futureDate = '2025-01-01'
        expect(
          result.current.validateDateResponse(dateConfig, futureDate).isValid
        ).toBe(true)
      })

      it('should return isValid set to false when value is in the future', () => {
        const dateConfig = {
          mandatory: false,
          date: {
            allowed_dates: AllowedDatesOptions.Future,
          },
        }
        const { result } = renderHook(() => useValidate())
        const pastDate = '2023-12-02'
        expect(
          result.current.validateDateResponse(dateConfig, pastDate).isValid
        ).toBe(false)
        expect(
          result.current.validateDateResponse(dateConfig, pastDate).errorType
        ).toBe('DATE_CANNOT_BE_IN_THE_PAST')
      })

      it('should return isValid set to false when value is today date and date of response is not allowed', () => {
        const dateConfig = {
          mandatory: false,
          date: {
            allowed_dates: AllowedDatesOptions.Future,
          },
        }
        const { result } = renderHook(() => useValidate())
        const todayDate = '2024-01-01'
        expect(
          result.current.validateDateResponse(dateConfig, todayDate).isValid
        ).toBe(false)
        expect(
          result.current.validateDateResponse(dateConfig, todayDate).errorType
        ).toBe('DATE_CANNOT_BE_TODAY')
      })

      it('should return isValid set to true when value is today date and date of response is allowed', () => {
        const dateConfig = {
          mandatory: false,
          date: {
            allowed_dates: AllowedDatesOptions.Future,
            include_date_of_response: true,
          },
        }
        const { result } = renderHook(() => useValidate())
        const pastDate = '2024-01-01'
        expect(
          result.current.validateDateResponse(dateConfig, pastDate).isValid
        ).toBe(true)
      })
    })

    describe('when all dates are allowed', () => {
      it('should return isValid set to true', () => {
        const dateConfig = {
          mandatory: false,
          date: {
            allowed_dates: AllowedDatesOptions.All,
          },
        }
        const { result } = renderHook(() => useValidate())
        const pastDate = '2023-01-01'
        expect(
          result.current.validateDateResponse(dateConfig, pastDate).isValid
        ).toBe(true)
        const todayDate = '2024-01-01'
        expect(
          result.current.validateDateResponse(dateConfig, todayDate).isValid
        ).toBe(true)
        const futureDate = '2024-01-05'
        expect(
          result.current.validateDateResponse(dateConfig, futureDate).isValid
        ).toBe(true)
      })
    })
  })
})
