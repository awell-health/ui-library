import React from 'react'
import { MessageAttachment } from '../../atoms'
import classes from './attachmentList.module.scss'
import { AttachmentListProps } from './types'

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
