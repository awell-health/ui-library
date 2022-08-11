// https://24ways.org/2010/calculating-color-contrast
export const getTextColor = (hexcolor: string): string => {
  const r = parseInt(hexcolor.substring(1, 3), 16)
  const g = parseInt(hexcolor.substring(3, 5), 16)
  const b = parseInt(hexcolor.substring(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#444' : '#fff'
}

/*
 * This function allows us to get lighter or darker version of the color
 * used to get hover / active etc. styles derived from accent color
 * */

export const shadeColor = (color: string, percent: number) => {
  let R = parseInt(color.substring(1, 3), 16)
  let G = parseInt(color.substring(3, 5), 16)
  let B = parseInt(color.substring(5, 7), 16)

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

export const opacityColor = (color: string, opacity: number) => {
  const R = parseInt(color.substring(1, 3), 16)
  const G = parseInt(color.substring(3, 5), 16)
  const B = parseInt(color.substring(5, 7), 16)

  return `rgba(${R}, ${G}, ${B}, ${opacity})`
}
