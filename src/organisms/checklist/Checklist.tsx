import React, { FC, MouseEventHandler, useState } from 'react'
import { Text } from '../../atoms/typography'
import { CheckboxButton } from '../../atoms/checkboxButton'
import { Button } from '../../atoms/button'
import classes from './checklist.module.scss'

export interface ChecklistItem {
  id: string
  label: string
}

interface ChecklistUpdate {
  itemId: string
  checked: boolean
}

export interface ChecklistProps {
  title: string
  items: Array<ChecklistItem>
  onItemUpdated: (new_value: ChecklistUpdate) => void
  onSubmit: MouseEventHandler<HTMLButtonElement>
  readOnly?: boolean
  disabled?: boolean
}

export const Checklist: FC<ChecklistProps> = ({
  title,
  items,
  onItemUpdated,
  onSubmit,
  readOnly = false,
  disabled = false,
}) => {
  const [checkedItems, setCheckedItems] = useState(readOnly ? items : [])

  const handleChange = (item: ChecklistItem) => (checked: boolean) => {
    if (checked) {
      setCheckedItems([...checkedItems, item])
    } else {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== item)
      )
    }
    onItemUpdated({ itemId: item.id, checked })
  }

  return (
    <div className={classes.awell_checklist}>
      <div className={classes.title}>
        <Text variant="textMedium">{title}</Text>
      </div>
      <div className={classes.checklist}>
        {items.map((item) => (
          <CheckboxButton
            onChange={(event) => handleChange(item)(event.target.checked)}
            label={item.label}
            id={item.id}
          />
        ))}
      </div>
      <Button
        onClick={onSubmit}
        disabled={checkedItems.length !== items.length || readOnly || disabled}
      >
        {readOnly ? 'submitted' : 'submit'}
      </Button>
    </div>
  )
}
