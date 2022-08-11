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
  return <MessageComponent content={content} subject={subject} format="SLATE" />
}
