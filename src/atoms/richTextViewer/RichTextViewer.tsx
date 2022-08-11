import React from 'react'
import { serializeHtml } from './serializeHtml'
import { Nodes } from '../../types'
import classes from './richTextViewer.module.scss'

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

  return (
    <div
      className={classes.content}
      dangerouslySetInnerHTML={{ __html: serializedHtml }}
    />
  )
}
