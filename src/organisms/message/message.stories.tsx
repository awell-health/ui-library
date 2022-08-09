import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Message as MessageComponent } from './Message'
import { MessageProps, MessageAttachmentType } from './types'
import image from '../../assets/link.svg'
import { Button } from '../../atoms/button/button.stories'

const defaultContent = [
  { type: 'p', children: [{ text: 'italic', italic: true }] },
  { type: 'p', children: [{ text: 'underline', underline: true }] },
  {
    type: 'p',
    children: [{ text: 'strike through', strikethrough: true }],
  },
]
const attachments = [
  {
    name: 'Attachment 1',
    url: 'https://www.awellhealth.com/',
    id: 'id1',
    type: MessageAttachmentType.Link,
  },
  {
    name: 'Attachment 2',
    url: 'https://www.awellhealth.com/',
    id: 'id2',
    type: MessageAttachmentType.Link,
  },
]

export default {
  title: 'organisms/Message',
  component: MessageComponent,
  argTypes: {
    content: {
      control: 'text',
      defaultValue: JSON.stringify(defaultContent, null, 2),
    },
    subject: {
      control: 'text',
      defaultValue: 'Orthopedic appointment follow up',
    },
    attachments: {
      control: 'object',
      defaultValue: attachments,
    },
    attachmentLabel: {
      control: 'text',
      defaultValue: 'Download',
    },
  },
} as Meta

export const Message: Story<MessageProps> = ({
  content,
  subject,
  attachmentLabel,
  attachments,
}) => {
  return (
    <MessageComponent
      content={content}
      subject={subject}
      format="SLATE"
      attachments={attachments}
      attachmentLabel={attachmentLabel}
      attachmentIcon={<img src={image} alt="" />}
    />
  )
}

Message.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
