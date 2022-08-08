import React from 'react'
import { RichTextViewer } from '../richTextViewer'
import classes from './message.module.scss'

export interface MessageProps {
  content: string
  subject: string
  children?: React.ReactNode
}

export const Message = ({
  content,
  subject,
  children,
}: MessageProps): JSX.Element => {
  return (
    <article className={classes.awell_message}>
      <div className={classes.wrapper}>
        <strong>{subject}</strong>
        <RichTextViewer nodes={content} format="HTML" />
      </div>
      {children}
    </article>
  )
}
