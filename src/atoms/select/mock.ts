function random(length: number) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}

export const LARGE_NUMBER_OF_OPTIONS = Array.from(new Array(25000)).map(
  (x, i) => ({
    label: random(10 + Math.ceil(Math.random() * 20)),
    value: i,
  })
)
