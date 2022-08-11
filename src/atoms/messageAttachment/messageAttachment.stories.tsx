import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  MessageAttachment as MessageAttachmentComponent,
  MessageAttachmentProps,
} from './MessageAttachment'
import image from './../../assets/link.svg'
import { ThemeProvider } from '../themeProvider'

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
    <ThemeProvider accentColor="#004ac2">
      <MessageAttachmentComponent name={name} url={url} label={label}>
        <img src={image} alt="" />
      </MessageAttachmentComponent>
    </ThemeProvider>
  )
}

MessageAttachment.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
