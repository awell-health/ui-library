import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import {
  AttachmentList as AttachmentListComponent,
  AttachmentListProps,
} from './AttachmentList'
import image from './../../assets/link.svg'
import { MessageAttachmentType } from '../../types'

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
  title: 'molecules/Attachment List',
  component: AttachmentListComponent,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Download',
    },
    attachments: {
      control: 'object',
      defaultValue: attachments,
    },
  },
} as Meta

export const MessageAttachment: Story<AttachmentListProps> = ({
  label,
  attachments,
}) => {
  return (
    <div>
      <AttachmentListComponent
        attachments={attachments}
        label={label}
        icon={<img src={image} alt="" />}
      />
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
