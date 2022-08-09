import React from 'react'
import { RichTextViewer } from '../../atoms'
import classes from './message.module.scss'
import { AttachmentList } from '../../molecules'
import { MessageProps } from './types'

export const Message = ({
  content,
  subject,
  children,
  format,
  attachmentIcon,
  attachmentLabel,
  attachments,
}: MessageProps): JSX.Element => {
  return (
    <article className={classes.awell_message}>
      <div className={classes.wrapper}>
        <strong>{subject}</strong>
        <RichTextViewer nodes={content} format={format} />
      </div>

      <AttachmentList
        attachments={attachments}
        icon={attachmentIcon}
        label={attachmentLabel}
      />
      {children}
    </article>
  )
}
