import React from 'react'
import classes from './richTextViewer.module.scss'

interface RichTextViewerProps {
  content: string
}

export const RichTextViewer = ({
  content,
}: RichTextViewerProps): JSX.Element => {
  /**
   * Ensure that escaped new line characters (\n)
   * are properly rendered as line breaks (<br />) in HTML.
   *
   * Example:
   * Input: "Line 1\nLine 2"
   * Output: "Line 1<br />Line 2"
   *
   * This is particularly useful when dealing with escaped strings
   * where new lines are indicated as \n and need to be displayed correctly in HTML.
   */
  const contentWithLineBreaks = content.split('\n').join('<br />')

  return (
    <div
      className={classes.content}
      dangerouslySetInnerHTML={{ __html: contentWithLineBreaks }}
    />
  )
}
