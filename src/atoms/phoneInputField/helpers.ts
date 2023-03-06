import {
  defaultCountries,
  buildCountryData,
  parseCountry,
} from 'react-international-phone'

export const getDefaultCountries = () => {
  return defaultCountries.map((country) => {
    const parsedCountry = parseCountry(country)
    if (parsedCountry.format == null) return country
    // remove all formatting mask characters except dots
    const newFormatMask = parsedCountry.format.replace(/[^\\.]*/g, '')
    // fix for countries with no formatting mask
    const fallbackFormatMask = '...............' // max 15 characters for E164 format
    return buildCountryData({
      ...parsedCountry,
      format: newFormatMask === '' ? fallbackFormatMask : newFormatMask,
    })
  })
}
