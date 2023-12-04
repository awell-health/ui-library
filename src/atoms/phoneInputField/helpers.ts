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
  const filtered = filteredCountries.map((country) => {
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
  // move United States, UK and Belgium to the top of the list
  const usIndex = filtered.findIndex((country) => country[2] === 'us')
  const ukIndex = filtered.findIndex((country) => country[2] === 'gb')
  const beIndex = filtered.findIndex((country) => country[2] === 'be')
  const us = filtered.splice(usIndex, 1)
  const uk = filtered.splice(ukIndex, 1)
  const be = filtered.splice(beIndex, 1)
  filtered.unshift(...us, ...uk, ...be)
  return filtered
}
