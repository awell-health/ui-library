import React from 'react'
import classes from './richTextViewer.module.scss'

interface RichTextViewerProps {
  content: string
}

export const RichTextViewer = ({
  content,
}: RichTextViewerProps): JSX.Element => {
  return (
    <div
      className={classes.content}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
