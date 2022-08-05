import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Checklist as ChecklistComponent, ChecklistProps } from '.'

const checklistItems = [
  {
    id: '0',
    label: 'Send documentation to patient',
  },
  {
    id: '1',
    label: 'Confirm testing availability',
  },
  {
    id: '2',
    label: 'Ensure documentation is signed',
  },
]

export default {
  title: 'organisms/Checklist',
  component: ChecklistComponent,
  displayName: 'Checklist',
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Checklist activity example',
    },
    submitLabel: {
      control: 'text',
      defaultValue: 'Submit',
    },
    items: {
      control: 'object',
      defaultValue: checklistItems,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    readOnly: {
      control: 'boolean',
      defaultValue: false,
    },
    onSubmit: { action: 'submitted' },
  },
}

export const Checklist: Story<ChecklistProps> = ({
  onSubmit,
  title,
  submitLabel,
  items,
  disabled,
  readOnly,
}) => {
  return (
    <ChecklistComponent
      title={title}
      items={items}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      disabled={disabled}
      readOnly={readOnly}
    />
  )
}

Checklist.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
