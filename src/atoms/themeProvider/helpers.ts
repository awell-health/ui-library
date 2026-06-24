import { Shape } from './ThemeProvider'

/**
 * Color string can be var(--variable, #ffffff) instead of #ffffff
 */
const getHexColorFromString = (string: string) => {
  const regularExpression = /#(?:[0-9a-fA-F]{3}){1,2}/g
  const extractedHexCodes = string.match(regularExpression)

  return extractedHexCodes?.[0] || ''
}

// https://24ways.org/2010/calculating-color-contrast
export const getTextColor = (colorString: string): string => {
  const hexColor = getHexColorFromString(colorString)

  const r = parseInt(hexColor.substring(1, 3), 16)
  const g = parseInt(hexColor.substring(3, 5), 16)
  const b = parseInt(hexColor.substring(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#444' : '#fff'
}

/*
 * This function allows us to get lighter or darker version of the color
 * used to get hover / active etc. styles derived from accent color
 * */

export const shadeColor = (colorString: string, percent: number) => {
  const hexColor = getHexColorFromString(colorString)

  let R = parseInt(hexColor.substring(1, 3), 16)
  let G = parseInt(hexColor.substring(3, 5), 16)
  let B = parseInt(hexColor.substring(5, 7), 16)

  R = parseInt(String((R * (100 + percent)) / 100))
  G = parseInt(String((G * (100 + percent)) / 100))
  B = parseInt(String((B * (100 + percent)) / 100))

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  const RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
  const GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
  const BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)
  return `#${RR}${GG}${BB}`
}

export const opacityColor = (colorString: string, opacity: number) => {
  const hexColor = getHexColorFromString(colorString)

  const R = parseInt(hexColor.substring(1, 3), 16)
  const G = parseInt(hexColor.substring(3, 5), 16)
  const B = parseInt(hexColor.substring(5, 7), 16)

  return `rgba(${R}, ${G}, ${B}, ${opacity})`
}

export const getBorderRadius = (
  shape?: Shape,
  type:
    | 'primary'
    | 'modal'
    | 'checkbox'
    | 'progressBar'
    | 'skeleton' = 'primary'
): string => {
  const DEFAULT = 'var(--awell-border-radius-md)'

  if (type === 'primary') {
    if (shape === 'rectangle') {
      return 'var(--awell-border-radius-none)'
    }

    if (shape === 'pill') {
      return 'var(--awell-border-radius-full)'
    }

    return DEFAULT
  }

  if (type === 'checkbox') {
    if (shape === 'rectangle') {
      return 'var(--awell-border-radius-none)'
    }

    if (shape === 'pill') {
      return 'var(--awell-border-radius-md)'
    }

    return 'var(--awell-border-radius-rounded)'
  }

  if (type === 'modal') {
    if (shape === 'rectangle') {
      return 'var(--awell-border-radius-none)'
    }

    return 'var(--awell-border-radius-lg)'
  }

  if (type === 'progressBar') {
    if (shape === 'rectangle') {
      return 'var(--awell-border-radius-none)'
    }

    return '30px'
  }

  if (type === 'skeleton') {
    if (shape === 'rectangle') {
      return 'var(--awell-border-radius-none)'
    }

    return 'var(--awell-border-radius-xl)'
  }

  return DEFAULT
}
