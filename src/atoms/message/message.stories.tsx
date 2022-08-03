import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Message as MessageComponent, MessageProps } from './Message'

const defaultContent = [
  { type: 'p', children: [{ text: 'italic', italic: true }] },
  { type: 'p', children: [{ text: 'underline', underline: true }] },
  {
    type: 'p',
    children: [{ text: 'strike through', strikethrough: true }],
  },
]

export default {
  title: 'atoms/Message',
  component: MessageComponent,
  argTypes: {
    content: {
      control: 'text',
      defaultValue: JSON.stringify(defaultContent, null, 2),
    },
  },
} as Meta

export const Message: Story<MessageProps> = ({ content }) => {
  return <MessageComponent content={content} />
}
