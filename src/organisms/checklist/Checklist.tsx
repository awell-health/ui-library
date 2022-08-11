import React, { FC, MouseEventHandler, useState } from 'react'
import { Text, CheckboxButton, Button, QuestionLabel } from '../../atoms'
import classes from './checklist.module.scss'

export interface ChecklistItem {
  id: string
  label: string
}

export interface ChecklistProps {
  title: string
  items: Array<ChecklistItem>
  onSubmit: MouseEventHandler<HTMLButtonElement>
  readOnly?: boolean
  disabled?: boolean
  submitLabel: string
}

export const Checklist: FC<ChecklistProps> = ({
  title,
  items,
  onSubmit,
  readOnly = false,
  disabled = false,
  submitLabel,
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
  }

  return (
    <div className={classes.awell_checklist}>
      <div className={classes.title}>
        <QuestionLabel label={title} />
      </div>
      <div className={classes.checklist}>
        {items.map((item) => (
          <CheckboxButton
            key={item.id}
            onChange={(event) => handleChange(item)(event.target.checked)}
            label={item.label}
            id={item.id}
            disabled={readOnly}
          />
        ))}
      </div>
      <div className={classes.button_wrapper}>
        <Button
          onClick={onSubmit}
          disabled={
            checkedItems.length !== items.length || readOnly || disabled
          }
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  )
}
