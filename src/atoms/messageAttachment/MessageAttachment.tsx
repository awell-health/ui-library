import React from 'react'
import classes from './messageAttachment.module.scss'
import { InlineText } from '../typography'
export interface MessageAttachmentProps {
  children?: React.ReactNode
  url: string
  name: string
  label?: string
}

export const MessageAttachment = ({
  url,
  name,
  label,
  children,
}: MessageAttachmentProps) => {
  return (
    <div className={classes.awell_message_container}>
      <div className={classes.awell_message_name_container}>
        {children}
        {name}
      </div>

      <a
        className={classes.awell_message_link_button}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    </div>
  )
}
