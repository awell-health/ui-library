import React, { FC, MouseEventHandler, useState } from 'react'
import { CheckboxButton, Button, QuestionLabel } from '../../../atoms'
import { useScrollHint } from '../../../hooks/useScrollHint'
import { HostedPageFooter } from '../../layouts/HostedPageLayout/HostedPageFooter'
import classes from './checklist.module.scss'
import layoutClasses from '../../layouts/HostedPageLayout/hostedPageLayout.module.scss'

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
  const { showScrollHint } = useScrollHint()

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
    <>
      <main
        id="ahp_main_content_with_scroll_hint"
        className={layoutClasses.main_content}
      >
        <div className={`${classes.awell_checklist} ${classes.container}`}>
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
                name={`checklist-${title}`}
              />
            ))}
          </div>
        </div>
      </main>
      <HostedPageFooter showScrollHint={showScrollHint}>
        <div className={`${classes.button_wrapper} ${classes.container}`}>
          <Button
            onClick={onSubmit}
            disabled={
              checkedItems.length !== items.length || readOnly || disabled
            }
            data-cy="submitChecklistButton"
          >
            {submitLabel}
          </Button>
        </div>
      </HostedPageFooter>
    </>
  )
}
