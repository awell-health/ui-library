import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Message as MessageComponent, MessageProps } from './Message'
import { messageFixture } from '../../constants/messageFixture'

export default {
  title: 'atoms/Message',
  component: MessageComponent,
  argTypes: {
    content: {
      control: 'text',
      defaultValue: JSON.stringify(messageFixture, null, 2),
    },
    subject: {
      control: 'text',
      defaultValue: 'Orthopedic appointment follow up',
    },
  },
} as Meta

export const Message: Story<MessageProps> = ({ content, subject }) => {
  return (
    // It's the responsibility of the consuming app to provide styling for surrounding layout
    <div style={{ maxWidth: '65ch', margin: '0 auto' }}>
      <MessageComponent content={content} subject={subject} format="SLATE" />
    </div>
  )
}
