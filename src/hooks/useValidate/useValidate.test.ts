import { renderHook } from '@testing-library/react-hooks'
import { useValidate } from './useValidate'

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
})
