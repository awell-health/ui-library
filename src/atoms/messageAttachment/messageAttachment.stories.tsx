import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  MessageAttachment as MessageAttachmentComponent,
  MessageAttachmentProps,
} from './MessageAttachment'
import image from './../../assets/link.svg'

export default {
  title: 'Atoms/Message Attachment',
  component: MessageAttachmentComponent,
  argTypes: {
    name: {
      control: 'text',
      defaultValue: 'Video attachment',
    },
    url: {
      control: 'text',
      defaultValue: 'https://www.awellhealth.com/',
    },
    label: {
      control: 'text',
      defaultValue: 'Download',
    },
  },
} as Meta

export const MessageAttachment: Story<MessageAttachmentProps> = ({
  name,
  url,
  label,
}) => {
  return (
    <div>
      <MessageAttachmentComponent name={name} url={url} label={label}>
        <img src={image} alt="" />
      </MessageAttachmentComponent>
    </div>
  )
}

MessageAttachment.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
