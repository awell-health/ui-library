import type { Option } from '../../../types'
import type { SelectItem, SelectValue } from '@awell-health/design-system'

/**
 * A SelectItem's `value` is used by the underlying react-select as the option's identity
 * (and React key). We key on the option's unique `id` — not its `value` — so that options
 * sharing the same `value` but different `label`s are still distinguishable. The real answer
 * value is preserved in `metadata` (see `selectValueToSingleValue` / `selectValueToOptions`).
 */
export const optionsToSelectItems = (
  options: Option[]
): SelectItem<Option>[] =>
  options.map((option) => ({
    value: String(option.id ?? option.value),
    label: option.label,
    metadata: option,
  }))

export const multiValueToSelectItems = (
  value: Option[] | undefined
): SelectItem<Option>[] => {
  if (!value || !Array.isArray(value)) return []
  return value.map((option) => ({
    value: String(option.id ?? option.value),
    label: option.label,
    metadata: option,
  }))
}

export const singleValueToSelectItem = (
  value: number | string | undefined,
  options: Option[]
): SelectItem<Option> | undefined => {
  if (value === undefined || value === '') return undefined
  const option = options.find((opt) => opt.value === value)
  if (!option) return undefined
  return {
    value: String(option.id ?? option.value),
    label: option.label,
    metadata: option,
  }
}

export const selectValueToOptions = (selected: SelectValue): Option[] => {
  if (!selected) return []
  const items = Array.isArray(selected)
    ? (selected as SelectItem<Option>[])
    : [selected as SelectItem<Option>]
  return items
    .map((item) => item.metadata)
    .filter((m): m is Option => m !== undefined)
}

export const selectValueToSingleValue = (
  selected: SelectValue
): number | string => {
  if (!selected || Array.isArray(selected)) return ''
  const item = selected as SelectItem<Option>
  return item.metadata?.value ?? ''
}
