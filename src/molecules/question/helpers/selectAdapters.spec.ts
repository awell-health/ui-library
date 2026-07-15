import type { SelectItem } from '@awell-health/design-system'
import type { Option } from '../../../types'
import {
  multiValueToSelectItems,
  optionsToSelectItems,
  selectValueToOptions,
  selectValueToSingleValue,
  singleValueToSelectItem,
} from './selectAdapters'

const makeOption = (partial: Partial<Option>): Option =>
  ({
    __typename: 'Option',
    id: 'id-default',
    label: 'label-default',
    value: 0,
    value_string: '0',
    ...partial,
  } as Option)

// Two options that intentionally share the same `value` but differ in `id`/`label`.
// This is the scenario that used to display the wrong label.
const duplicateValueOptions: Option[] = [
  makeOption({ id: 'id-1', label: 'Label 1', value: 'x' as unknown as number }),
  makeOption({ id: 'id-2', label: 'Label 2', value: 'x' as unknown as number }),
]

describe('selectAdapters', () => {
  describe('optionsToSelectItems', () => {
    it('keys each SelectItem by the unique option id, not its value', () => {
      const items = optionsToSelectItems(duplicateValueOptions)
      expect(items.map((i) => i.value)).toEqual(['id-1', 'id-2'])
      expect(items.map((i) => i.label)).toEqual(['Label 1', 'Label 2'])
      // The real option (with its value) is preserved in metadata.
      expect(items[0].metadata).toBe(duplicateValueOptions[0])
      expect(items[1].metadata).toBe(duplicateValueOptions[1])
    })

    it('falls back to the value when an option has no id', () => {
      const [item] = optionsToSelectItems([
        makeOption({ id: undefined as unknown as string, value: 42 }),
      ])
      expect(item.value).toBe('42')
    })
  })

  describe('multiValueToSelectItems', () => {
    it('keys each SelectItem by the unique option id', () => {
      const items = multiValueToSelectItems(duplicateValueOptions)
      expect(items.map((i) => i.value)).toEqual(['id-1', 'id-2'])
    })

    it('returns an empty array for nullish / non-array input', () => {
      expect(multiValueToSelectItems(undefined)).toEqual([])
    })
  })

  describe('singleValueToSelectItem', () => {
    it('keys the reconstructed SelectItem by option id', () => {
      const item = singleValueToSelectItem('x' as unknown as number, duplicateValueOptions)
      expect(item?.value).toBe('id-1')
      expect(item?.label).toBe('Label 1')
    })

    it('returns undefined for empty / missing values', () => {
      expect(singleValueToSelectItem(undefined, duplicateValueOptions)).toBeUndefined()
      expect(singleValueToSelectItem('', duplicateValueOptions)).toBeUndefined()
      expect(
        singleValueToSelectItem('missing' as unknown as number, duplicateValueOptions)
      ).toBeUndefined()
    })
  })

  describe('selectValueToSingleValue', () => {
    it('returns the option value from metadata regardless of id-keying', () => {
      const item: SelectItem<Option> = {
        value: 'id-2',
        label: 'Label 2',
        metadata: duplicateValueOptions[1],
      }
      // Even though the SelectItem is keyed by id, the persisted answer is the option value.
      expect(selectValueToSingleValue(item)).toBe('x')
    })

    it('returns an empty string for arrays / nullish input', () => {
      expect(selectValueToSingleValue(null)).toBe('')
      expect(selectValueToSingleValue([])).toBe('')
    })
  })

  describe('selectValueToOptions', () => {
    it('recovers the full options from metadata', () => {
      const items = optionsToSelectItems(duplicateValueOptions)
      expect(selectValueToOptions(items)).toEqual(duplicateValueOptions)
    })
  })
})
