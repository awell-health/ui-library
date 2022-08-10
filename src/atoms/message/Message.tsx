import React from 'react'
import { RichTextViewer } from '../richTextViewer'
import classes from './message.module.scss'

export interface MessageProps {
  content: string
  subject: string
  children?: React.ReactNode
  format: 'SLATE' | 'HTML'
}

export const Message = ({
  content,
  subject,
  children,
  format,
}: MessageProps): JSX.Element => {
  return (
    <article className={classes.awell_message}>
      <div className={classes.wrapper}>
        <div className={classes.message_title}>{subject}</div>
        <div className={classes.content}>
          <RichTextViewer nodes={content} format={format} />
        </div>
      </div>
      {children}
    </article>
  )
}
