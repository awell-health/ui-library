import React from 'react'
import { MessageAttachment } from '../../../types/generated/types-orchestration'
import { AttachmentLabels } from '../../../types'
export { MessageAttachmentType } from '../../../types/generated/types-orchestration'

export interface MessageProps {
  onMessageRead: () => void
  content: string
  subject: string
  children?: React.ReactNode
  format: 'SLATE' | 'HTML'
  attachments: Array<MessageAttachment>
  attachmentIcon: React.ReactNode
  attachmentLabels: AttachmentLabels
  buttonLabels: {
    readMessage: string
  }
}
