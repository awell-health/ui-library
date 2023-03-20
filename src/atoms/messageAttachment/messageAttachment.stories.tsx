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
  decorators: [
    (StoryComponent) => (
      <ThemeProvider accentColor="#004ac2">
        <StoryComponent />
      </ThemeProvider>
    ),
  ],
} as Meta

export const MessageAttachment: Story<MessageAttachmentProps> = ({
  name,
  url,
  label,
}) => {
  return (
    <MessageAttachmentComponent name={name} url={url} label={label}>
      <img src={image} alt="" />
    </MessageAttachmentComponent>
  )
}

MessageAttachment.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
