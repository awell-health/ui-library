import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { AttachmentList as AttachmentListComponent } from './AttachmentList'
import image from './../../assets/link.svg'
import { MessageAttachmentType } from '../../types'
import { AttachmentListProps } from './types'
import { ThemeProvider } from '../../atoms/'

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
    type: MessageAttachmentType.Video,
  },
  {
    name: 'Attachment 3',
    url: 'https://www.awellhealth.com/',
    id: 'id2',
    type: MessageAttachmentType.File,
  },
]

export default {
  title: 'molecules/Attachment List',
  component: AttachmentListComponent,
  argTypes: {
    labels: {
      control: 'text',
      defaultValue: {
        video: 'See video',
        link: 'Open link',
        file: 'Download',
      },
    },
    attachments: {
      control: 'object',
      defaultValue: attachments,
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

export const MessageAttachment: Story<AttachmentListProps> = ({
  labels,
  attachments,
}) => {
  return (
    <AttachmentListComponent
      attachments={attachments}
      labels={labels}
      icon={<img src={image} alt="" />}
    />
  )
}

MessageAttachment.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}
