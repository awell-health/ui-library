/**
 * There can be escape characters in JSON string i.e \n, \r etc.
 * The JSON.parse() function returns a string if there are escape characters.
 * So we parse again to make sure escape characters are removed
 *
 * @see https://stackoverflow.com/questions/42494823/json-parse-returns-string-instead-of-object
 */
export const custom_json_parser = (blob: string): any => {
  try {
    if (typeof blob !== 'string') {
      throw new Error()
    }

    const parsed = JSON.parse(blob)
    if (typeof parsed === 'string') {
      return JSON.parse(parsed)
    }
    return parsed
  } catch (error) {
    return 'invalid JSON'
  }
}
