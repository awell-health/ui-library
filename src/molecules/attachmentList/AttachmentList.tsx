import React from 'react'
import { MessageAttachment } from '../../atoms'
import classes from './attachmentList.module.scss'
import { AttachmentListProps } from './types'

export const AttachmentList = ({
  attachments,
  labels,
  icon,
}: AttachmentListProps) => {
  return (
    <div className={classes.awell_attachment_list}>
      {attachments.map(({ url, name, type }) => {
        const typeLowerCase: string = type.toLowerCase()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const label = labels[typeLowerCase] || ''
        return (
          <MessageAttachment
            url={url}
            name={name}
            label={label}
            key={`${url}-${name}`}
          >
            {icon}
          </MessageAttachment>
        )
      })}
    </div>
  )
}
