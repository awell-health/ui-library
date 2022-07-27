import React from 'react'
import { RichTextViewer } from '../richTextViewer'
import { Nodes } from '../../types'

export interface MessageProps {
  content: Nodes
}

export const Message = ({ content }: MessageProps): JSX.Element => {
  return (
    <div>
      <RichTextViewer nodes={content} />
    </div>
  )
}
