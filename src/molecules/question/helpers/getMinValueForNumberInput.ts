import { Maybe, NumberConfig } from '../../../types'

export const getMinValueForNumberInput = (
  numberConfig: Maybe<NumberConfig> | undefined
): number | undefined => {
  if (
    numberConfig &&
    numberConfig.range &&
    numberConfig.range.enabled === true
  ) {
    return numberConfig.range.min as number
  }

  return undefined
}
