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
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const Modal: Story = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const onConfirm = () => {
    alert('Handle confirm')
  }

  const onClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div style={{ padding: '1em' }}>
        <Button onClick={() => setIsModalOpen(true)}>Open modal</Button>
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        title="Are you sure you want to cancel your session?"
        description="There are still some activities for you to complete. If you cancel your session, you might also lose data you haven't submitted yet."
        icon="warning"
        onCloseModal={onClose}
        buttons={[
          <Button variant="primary" onClick={onConfirm}>
            Yes, cancel session
          </Button>,
          <Button variant="tertiary" onClick={onClose}>
            No
          </Button>,
        ]}
      />
    </>
  )
}
