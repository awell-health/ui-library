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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <ThemeProvider accentColor="#004ac2">
      <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
      <ModalComponent
        isOpen={isModalOpen}
        title="Title"
        description="Description"
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
