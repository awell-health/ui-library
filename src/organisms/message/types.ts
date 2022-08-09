import React from 'react'
import { MessageAttachment } from '../../types/generated/types-orchestration'
export { MessageAttachmentType } from '../../types/generated/types-orchestration'

export interface MessageProps {
  content: string
  subject: string
  children?: React.ReactNode
  format: 'SLATE' | 'HTML'
  attachments: Array<MessageAttachment>
  attachmentIcon: React.ReactNode
  attachmentLabel: string
}
