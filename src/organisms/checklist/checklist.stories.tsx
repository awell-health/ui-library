/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Checklist as ChecklistComponent} from '.'

export default {
    title: 'organisms/Checklist',
    component: ChecklistComponent,
    displayName: 'Checklist',
}

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

export const Checklist: Story = ({ onItemUpdated, onSubmit }) => {
    return (
                <ChecklistComponent
                    title="My checklist"
                    items={checklistItems}
                    onItemUpdated={onItemUpdated}
                    onSubmit={onSubmit}
                />
    )
}

Checklist.args = {
    labels: {
        title: 'My Checklist',
        buttonSubmit: 'Submit',
        buttonCompleted: 'Submitted',
    },
    onItemUpdated: action(`item updated`),
    onSubmit: action('submitted'),
}