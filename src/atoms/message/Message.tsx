import React from 'react'
import classes from './message.module.scss'
import { RichTextViewer } from '../richTextViewer'

export interface MessageProps {
  content: Array<any>
}

export const Message = ({ content }: MessageProps): JSX.Element => {
  return (
    <div className={classes.awell_message}>
      <RichTextViewer nodes={content} />
    </div>
  )
}
