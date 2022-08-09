import React from 'react'
import { MessageAttachment } from '../../atoms'
import { MessageAttachment as MessageAttachmentType } from '../../types/message'
import classes from './attachmentList.module.scss'

export interface AttachmentListProps {
  attachments: Array<MessageAttachmentType>
  icon: React.ReactNode
  label: string
}

export const AttachmentList = ({
  attachments,
  label,
  icon,
}: AttachmentListProps) => {
  return (
    <div className={classes.awell_attachment_list}>
      {attachments.map(({ url, name }) => (
        <MessageAttachment
          url={url}
          name={name}
          label={label}
          key={`${url}-${name}`}
        >
          {icon}
        </MessageAttachment>
      ))}
    </div>
  )
}
