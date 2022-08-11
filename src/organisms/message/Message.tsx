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
  attachmentLabels,
  attachments,
}: MessageProps): JSX.Element => {
  return (
    <article className={classes.awell_message}>
      <div className={classes.wrapper}>
        <div className={classes.message_title}>{subject}</div>
        <div className={classes.content}>
          <RichTextViewer nodes={content} format={format} />
        </div>
      </div>

      <AttachmentList
        attachments={attachments}
        icon={attachmentIcon}
        labels={attachmentLabels}
      />
      {children}
    </article>
  )
}
