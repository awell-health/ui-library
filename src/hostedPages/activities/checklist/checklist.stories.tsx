import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Checklist as ChecklistComponent, ChecklistProps } from '.'
import { ThemeProvider } from '../../../atoms'
import { HostedPageLayout } from '../../layouts/HostedPageLayout/HostedPageLayout'

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
  title: 'HostedPages/Activities/Checklist',
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
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const Checklist: Story<ChecklistProps> = ({
  onSubmit,
  title,
  submitLabel,
  items,
  disabled,
  readOnly,
}) => {
  return (
    <HostedPageLayout onCloseHostedPage={() => alert('Stop session')}>
      <ChecklistComponent
        title={title}
        items={items}
        onSubmit={onSubmit}
        submitLabel={submitLabel}
        disabled={disabled}
        readOnly={readOnly}
      />
    </HostedPageLayout>
  )
}

Checklist.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
