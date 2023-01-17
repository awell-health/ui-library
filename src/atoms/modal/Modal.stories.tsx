import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'
import { Modal as ModalComponent } from './Modal'
import { Button, ThemeProvider } from '..'

export default {
  title: 'Atoms/Modal',
  component: ModalComponent,
  argTypes: {},
  decorators: [
    (StoryComponent) => (
      <div>
        <StoryComponent />
      </div>
    ),
  ],
} as Meta

export const Modal: Story = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <ThemeProvider accentColor="#004ac2">
      <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
      <ModalComponent
        isOpen={isModalOpen}
        title="Are you sure you want to cancel your session?"
        description="There are still some activities for you to complete. If you cancel your session, you might also lose data you haven't submitted yet."
        icon="success"
        onConfirm={() => {
          alert('Handle confirm')
        }}
        onClose={() => setIsModalOpen(false)}
        buttonLabels={{ confirm: 'Confirm', cancel: 'Cancel' }}
      />
    </ThemeProvider>
  )
}
