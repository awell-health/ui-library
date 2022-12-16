import React from 'react'
import { serializeHtml } from './serializeHtml'
import { Nodes } from '../../types'
import classes from './richTextViewer.module.scss'
import { sanitize } from 'dompurify'

interface HTMLRichTextViewerProps {
  nodes: string
  format: 'HTML'
}
interface SLATEichTextViewerProps {
  nodes: Nodes | string
  format: 'SLATE'
}

export const RichTextViewer = ({
  nodes,
  format,
}: SLATEichTextViewerProps | HTMLRichTextViewerProps): JSX.Element => {
  const serializedHtml = format === 'SLATE' ? serializeHtml(nodes) : nodes
  // See https://github.com/cure53/DOMPurify/issues/317
  const purifiedMessage = sanitize(serializedHtml, { ADD_ATTR: ['target'] })

  return (
    <div
      className={classes.content}
      dangerouslySetInnerHTML={{ __html: purifiedMessage }}
    />
  )
}
