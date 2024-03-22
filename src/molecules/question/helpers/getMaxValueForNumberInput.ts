import { Maybe, NumberConfig } from '../../../types'

export const getMaxValueForNumberInput = (
  numberConfig: Maybe<NumberConfig> | undefined
): number | undefined => {
  if (
    numberConfig &&
    numberConfig.range &&
    numberConfig.range.enabled === true
  ) {
    return numberConfig.range.max as number
  }

  return undefined
}
