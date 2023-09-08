import {
  defaultCountries,
  buildCountryData,
  parseCountry,
  CountryIso2,
} from 'react-international-phone'
import { CountryData } from '../../hooks/useValidate'

export const getDefaultCountries = (
  availableCountries: CountryIso2 | Array<CountryIso2> | undefined
): Array<CountryData> => {
  const filteredCountries = defaultCountries.filter((country) => {
    if (availableCountries === undefined) return true
    if (Array.isArray(availableCountries)) {
      return availableCountries.includes(country[2])
    }
    return country[2] === availableCountries
  })
  return filteredCountries.map((country) => {
    const parsedCountry = parseCountry(country)
    if (parsedCountry.format == null) return country
    // remove all formatting mask characters except dots
    const newFormatMask = parsedCountry.format.replace(/[^\\.]*/g, '')
    // fix for countries with no formatting mask
    // 15 is the max length of an E164 phone number
    const fallbackFormatMask = '.'.repeat(15)
    return buildCountryData({
      ...parsedCountry,
      format: newFormatMask === '' ? fallbackFormatMask : newFormatMask,
    })
  })
}
