import {
  defaultCountries,
  buildCountryData,
  parseCountry,
  CountryIso2,
} from 'react-international-phone'
import { CountryData } from '../../hooks/useValidate'
import { isArray, isNil } from 'lodash'

export const getDefaultCountries = (
  availableCountries: Array<CountryIso2> | undefined,
  initialCountry: CountryIso2 | undefined
): Array<CountryData> => {
  // remove all other characters from country formatting to display E164 format
  let countries = defaultCountries.map((country) => {
    const parsedCountry = parseCountry(country)
    if (isNil(parsedCountry.format)) return country
    // remove all formatting mask characters except dots
    const newFormatMask = parsedCountry.format.replace(/[^\\.]*/g, '')
    // fix for countries with no formatting mask
    const fallbackFormatMask = '...............' // max 15 characters for E164 format
    return buildCountryData({
      ...parsedCountry,
      format: newFormatMask === '' ? fallbackFormatMask : newFormatMask,
    })
  })
  if (
    !isNil(availableCountries) &&
    isArray(availableCountries) &&
    availableCountries.length > 0
  ) {
    countries = countries.filter((c) => {
      const availableCountriesLowerCased = availableCountries.map((c) =>
        c.toLowerCase()
      )
      // if initialCountry is available, always make sure it is included
      if (!isNil(initialCountry) && c[2] === initialCountry) {
        return true
      }
      return availableCountriesLowerCased.includes(c[2])
    })
  }
  // move United States, UK and Belgium to the top of the list
  const usIndex = countries.findIndex((c) => c[2] === 'us')
  const ukIndex = countries.findIndex((c) => c[2] === 'gb')
  const beIndex = countries.findIndex((c) => c[2] === 'be')
  const us = countries.splice(usIndex, 1)
  const uk = countries.splice(ukIndex, 1)
  const be = countries.splice(beIndex, 1)
  countries.unshift(...us, ...uk, ...be)

  return countries
}
