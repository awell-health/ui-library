import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Message as MessageComponent } from './Message'
import { MessageProps, MessageAttachmentType } from './types'
import image from '../../../assets/link.svg'
import { ThemeProvider } from '../../../atoms'
import { messageFixture } from '../../../constants/messageFixture'
import { HostedPageLayout } from '../../layouts/HostedPageLayout/HostedPageLayout'

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
  title: 'HostedPages/Activities/Message',
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
    attachments: {
      control: 'object',
      defaultValue: attachments,
    },
    attachmentLabels: {
      control: 'object',
      defaultValue: {
        video: 'Open video',
        link: 'Open link',
        file: 'Download',
      },
    },
  },
} as Meta

export const Message: Story<MessageProps> = ({
  content,
  subject,
  attachmentLabels,
  attachments,
}) => {
  return (
    <ThemeProvider accentColor="#004ac2">
      <HostedPageLayout onCloseHostedPage={() => alert('Stop session')}>
        <MessageComponent
          content={content}
          subject={subject}
          attachments={attachments}
          attachmentLabels={attachmentLabels}
          attachmentIcon={<img src={image} alt="" />}
          buttonLabels={{ readMessage: 'Done' }}
          onMessageRead={() => alert('Message read!')}
        />
      </HostedPageLayout>
    </ThemeProvider>
  )
}

Message.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
